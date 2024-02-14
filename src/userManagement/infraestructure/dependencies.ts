import { UserMysqlRepository } from "./Repository/userMysqlRepository";

import { CreateUserUseCase } from "../application/UseCase/createUserUseCase";
import { CreateUserController } from "./Controller/createUserController";

import { VerificateUserUseCase } from "../application/UseCase/verificateUserUseCase";
import { VerificateUserController } from "./Controller/verificateUserController";

import { LoginUserUseCase } from "../application/UseCase/loginUserUseCase";
import { LoginUserController } from "./Controller/loginUserController";

import { LogoutUserUseCase } from "../application/UseCase/logoutUserUseCase";
import { LogoutUserController } from "./Controller/logoutUserController";


export const userMysqlRepository = new UserMysqlRepository()

export const createUserUseCase = new CreateUserUseCase(userMysqlRepository);
export const createUserController = new CreateUserController(createUserUseCase,);

export const verificateUserUseCase = new VerificateUserUseCase(userMysqlRepository);
export const verificateUserController = new VerificateUserController(verificateUserUseCase);

export const loginUserUseCase = new LoginUserUseCase(userMysqlRepository);
export const loginUserController = new LoginUserController(loginUserUseCase);

export const logoutUserUseCase = new LogoutUserUseCase(userMysqlRepository);
export const logoutUserController = new LogoutUserController(logoutUserUseCase);
