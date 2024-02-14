import { User } from "../Entity/user";

export interface UserInterface{

    createUser(user:User):Promise<User|any | null>;

    verificateUser(token:string):Promise<User | any | null | string>;

    loginUser(email:string, password:string):Promise<User | any | string | null>;

    logoutUser(uuid:string, token:string):Promise<User | any | string |null>;

}