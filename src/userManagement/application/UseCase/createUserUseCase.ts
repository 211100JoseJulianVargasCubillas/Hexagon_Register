import { Contact } from "../../domain/Entity/contact";
import { Credential} from "../../domain/Entity/credential";
import { Status } from "../../domain/Entity/status";
import { User } from "../../domain/Entity/user";
import { UserInterface } from "../../domain/Port/userInterface";
import { generarToken } from "../../../helpers/tokenEmail";
import { encrypt } from "../../../helpers/ashs";
import { validate } from "class-validator";
import { ValidatorRegisterUser
 } from "../../domain/validation/userValidate";
export class CreateUserUseCase {

    constructor(readonly userInterface : UserInterface){}

   
    async run(  name:string, lastName:string , cellphone:string, email:string, password:string ):Promise<User | any | null> {

        const token = generarToken(email);
        const hashPassword = await encrypt(password); 
        
        let post = new ValidatorRegisterUser( name, lastName, cellphone, email, password);
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {   
            let contac = new Contact (name, lastName, cellphone);
            let credential = new Credential (email, hashPassword);
            let status = new Status(token,null);

            let user = new User(
                contac,
                credential,
                status
            );

            return await this.userInterface.createUser(user);

        } catch (error) {
            return null;
        }
    }
}