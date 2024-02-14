import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';

export class ValidateLogin {

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    constructor(
        email: string,
        password: string
    ) {
        this.email = email;
        this.password = password;
    }

}

export class ValidatorRegisterUser {

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public name: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public lastName: string;

    @IsNotEmpty()
    @IsString()
    @Length(10) 
    public cellphone: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;


    constructor(
        name: string,
        lastName: string,
        cellphone: string,
        email: string,
        password: string,
    ) {
        this.name = name;
        this.lastName = lastName;
        this.cellphone = cellphone;
        this.email = email;
        this.password = password;
    }

}

export class ValidatorLogOut {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    public token:string
    constructor(uuid:string, token:string) {
        this.uuid = uuid
        this.token = token;
    }
}

export class ValidatorToken {

    @IsNotEmpty()
    @IsString()
    public token:string
    constructor(token:string) {
        this.token = token;
    }
}