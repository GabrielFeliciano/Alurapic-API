import { Body, Controller, Get } from "@nestjs/common";
import UserService from "src/user/user.service";
import { FilterUserByItsName, FilterUsersByTheirName } from "./filters";

@Controller('search')
export default class searchController {
    constructor (
        private userService: UserService
    ) {}

    @Get('user/name')
    filterUserByItsName (
        @Body() filter: FilterUserByItsName
    ) {
        return this.userService.searchUserByItsName(filter.name, filter.caseSensitive);
    }

    @Get('users/name')
    filterUsersByTheirNames (
        @Body() filter: FilterUsersByTheirName
    ) {
        return this.userService.searchUsersByTheirNames(filter.names, filter.caseSensitive);
    }
}