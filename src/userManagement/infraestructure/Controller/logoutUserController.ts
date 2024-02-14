import { Request, Response } from "express";
import { LogoutUserUseCase } from "../../application/UseCase/logoutUserUseCase";

export class LogoutUserController{

    constructor(readonly logoutUserUseCase:LogoutUserUseCase){}

    async logout(req:Request, res:Response){
        try {
            let { uuid, token} = req.body;

            const cerarr = await this.logoutUserUseCase.logout(uuid,token);

            if (cerarr) {
                return res.status(201).send({
                   cerarr
                })
            }

            
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            } 
            return res.status(500).send({
                status: "error",
                message: "An error occurred while delete the user."
            });
        }
    }

}