import { User } from "../../domain/Entity/user";
import { UserInterface } from "../../domain/Port/userInterface";
import { Status } from "../../domain/Entity/status";
import { validate } from "class-validator";
import { ValidatorToken } from "../../domain/validation/userValidate";

export class VerificateUserUseCase{

    constructor( readonly userInterface:UserInterface ){}

    async update (token:string):Promise<User | any| null| string>{

        //validator-class
        let post = new ValidatorToken(token)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
        
            let tokenVeri = await this. userInterface.verificateUser(token);
            return tokenVeri;
        } catch (error){
            return null;
        }
    }   
}