import { User } from "../../domain/Entity/user";
import { UserInterface } from "../../domain/Port/userInterface";
import { validate } from "class-validator";
import { ValidatorLogOut } from "../../domain/validation/userValidate";

export class LogoutUserUseCase{

    constructor(readonly userInterface: UserInterface){}

    async logout(uuid:string, token: string):Promise<User| null | any| string>{

        //validator-class
        let post = new ValidatorLogOut(uuid, token)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const close = await this.userInterface.logoutUser(uuid, token);
            return close;
        } catch (error) {
            return null;
        }
    }
}