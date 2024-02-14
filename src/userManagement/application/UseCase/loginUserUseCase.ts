import { User } from "../../domain/Entity/user";
import { UserInterface } from "../../domain/Port/userInterface";
import { validate } from "class-validator";
import { ValidateLogin } from "../../domain/validation/userValidate";

export class LoginUserUseCase{

    constructor(readonly userInterface:UserInterface){}

    async login(email:string, password:string):Promise<User | any | null | string>{

        //validator-class
        let post = new ValidateLogin(email, password)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const userLogin  = await this.userInterface.loginUser(email,password);
            return userLogin;
        } catch (error) {
            return null;
        }
    }
}