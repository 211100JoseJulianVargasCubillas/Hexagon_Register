import { createUserController, verificateUserController, loginUserController, logoutUserController } from "../dependencies";
import express  from "express";
import { validateToken } from "../../../helpers/verificateToken";


export const userRouter = express.Router();


userRouter.post("/", createUserController.run.bind(createUserController));

userRouter.put("/:token/activate", verificateUserController.update.bind(verificateUserController));

userRouter.post("/login", loginUserController.login.bind(loginUserController));

userRouter.use(validateToken);

userRouter.post("/logout", logoutUserController.logout.bind(logoutUserController));
