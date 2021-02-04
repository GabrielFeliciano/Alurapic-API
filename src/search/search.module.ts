import { Module } from "@nestjs/common";
import UserService from "src/user/user.service";
import searchController from "./search.controller";

@Module({
    imports: [],
    controllers: [searchController],
    providers: [UserService],
})
export class SearchModule {}