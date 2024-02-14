import { CreateUserUseCase } from "../../application/UseCase/createUserUseCase";
import { Request, Response } from "express";
import { EmailService } from "../Service/email";
import { User } from "../../domain/Entity/user";

export class CreateUserController {
    constructor(readonly createUserUseCase: CreateUserUseCase) { }

    async run(req: Request, res: Response) {
        let { name, lastName, cellphone, email, password } = req.body;
        try {

            let user = await this.createUserUseCase.run(name, lastName, cellphone, email, password);

            if (user) {
                const apiKey = 're_hprNtZnE_HYSGhLwWhUAikAJm4UzsRNWP';
                const emailService = new EmailService(apiKey);

                await emailService.run(user);

                return res.status(201).send({
                    status: "succes",
                    data: {
                        uuid: user.uuid,
                        Name: user.contact.name,
                        email: user.credential.email,
                        Token: user.status.activationToken
                    }
                });
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
