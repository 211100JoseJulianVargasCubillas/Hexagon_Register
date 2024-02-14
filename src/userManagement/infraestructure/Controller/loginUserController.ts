import { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/UseCase/loginUserUseCase";
import { User } from "../../domain/Entity/user";

export class LoginUserController {
    constructor(readonly loginUserUseCase: LoginUserUseCase) { }

    async login(req: Request, res: Response) {
        try {
            let { email, password } = req.body;

            const loginUser = await this.loginUserUseCase.login(email, password);

            if (loginUser) {
                return res.status(201).send({
                    info: loginUser,
                    
                })
            }
            else {
                return res.status(404).send({
                    stauts: "Error"
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