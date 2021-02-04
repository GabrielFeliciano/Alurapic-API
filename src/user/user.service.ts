import { Injectable } from "@nestjs/common";
import { FilterUserByItsName, FilterUsersByTheirName } from "src/search/filters";
import { User } from "./user.entity";

@Injectable()
export default class UserService {
    private users: User[] = [
        new User('Alice', 'Alice'),
        new User('Gabriel', 'Biel'),
        new User('Pedrinho', 'Xxx_FuccYou_xxX')
    ];

    create (user): User {
        this.users.push(user);
        return user
    }

    searchUserByItsName (nameSearched: string, caseSensitive: boolean = false) {
        const nameToSearch = caseSensitive ? nameSearched.toLowerCase() : nameSearched;
        return this.users.find(user => {
            const userName = caseSensitive ? user.name.toLowerCase() : user.name;
            return nameToSearch === userName;
        });
    }

    searchUsersByTheirNames (namesSearched: string[], caseSensitive: boolean = false) {
        const namesToSearch = caseSensitive ? 
        namesSearched.map(name => name.toLowerCase()) : namesSearched;

        return this.users.filter(user => {
            const userName = caseSensitive ? user.name.toLowerCase() : user.name;
            return namesToSearch.includes(userName);
        });
    }
}