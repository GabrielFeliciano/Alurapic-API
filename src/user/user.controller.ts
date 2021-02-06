import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
import { NestResponse } from "src/core/http/nest-response";
import { NestResponseBuilder } from "src/core/http/nest-response-builder";
import { User } from "./user.entity";
import UserService from "./user.service";

@Controller('user')
export default class UserController {
    constructor (
        private userService: UserService
    ) {}

    @Get(':username')
    searchUserByUsername (@Param('username') username: string) {
        const queryResult = this.userService.searchUserByUsername(username);

        if (queryResult) {
            return queryResult;
        } else {
            throw new NotFoundException(`Could not find user ${username}`);
        }
    }

    @Post()
    createUser (
        @Body() user: User
    ): NestResponse {
        const createdUser = this.userService.create(user);

        return new NestResponseBuilder ()
            .setStatus(HttpStatus.CREATED)
            .setHeaders({
                'location': `/user/${createdUser.username}`
            })
            .setBody(createdUser)
            .build()
    }
}