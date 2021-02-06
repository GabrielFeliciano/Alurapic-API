import { HttpException, HttpStatus, Param, Query, Res } from "@nestjs/common";
import { Body, Controller, Get } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import UserService from "src/user/user.service";
import { QueryUserByName, QueryUsersByName, QueryUserByUsername } from "./filters";

@Controller('search')
export default class searchController {
    constructor (
        private userService: UserService
    ) {}

    @Get('user/name')
    searchUserByItsName (
        @Body() filter: QueryUserByName
    ) {
        return this.userService.searchUserByName(filter.name, filter.caseSensitive);
    }

    @Get('user/username')
    searchUsersByUsername (
        @Body() filter: QueryUserByUsername
    ) {
        return this.userService.searchUserByUsername(
            filter.username.toLowerCase()
        );
    }
}