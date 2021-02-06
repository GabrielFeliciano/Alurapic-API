import { Body, Injectable, NotFoundException } from "@nestjs/common";
import { QueryUserByName, QueryUsersByName } from "src/search/filters";
import { User } from "./user.entity";

@Injectable()
export default class UserService {
    private users: User[] = [];

    create (user: User): User {
        this.users.push(user);
        return user
    }

    searchMultipleUsersByName () {

    }

    searchUserByName (queriedName: string, caseSensitive: boolean = false): User | undefined {
        const nameToSearch = caseSensitive ? queriedName.toLowerCase() : queriedName;

        return this.users.find(user => {
            const name = caseSensitive ? user.fullname.toLowerCase() : user.fullname;
            return nameToSearch === name;
        });
    }
    
    searchUserByUsername (queriedUsername: string): User | undefined {
        return this.users.find(user => {
            const username = user.username;
            return queriedUsername === username;
        });
    }

}