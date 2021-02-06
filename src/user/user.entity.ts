import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsUsernameUnique } from "./isUserAlreadyExist.validator";

export class User {
    id: number;

    @IsNotEmpty()
    fullname: string;

    @IsUsernameUnique()
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsEmail()
    email: string;

    @Exclude({
        toPlainOnly: true
    })
    @IsNotEmpty()
    password: string;

    createdAt: Date;
}