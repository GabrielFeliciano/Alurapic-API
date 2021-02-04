import { Body, Controller, Get, HttpException, NotFoundException, Post } from "@nestjs/common";
import { User } from "./user.entity";
import UserService from "./user.service";

@Controller('users?')
export default class UserController {
    constructor (
        private userService: UserService
    ) {}

    @Get()
    searchUserByName (name: string) {
        return this.userService
    }

    @Post()
    createUser (@Body() user: User): User {
        return this.userService.create(user);
    }
}