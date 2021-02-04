export class User {
    id: number;

    name: string;
    username: string;
    
    email: string;
    password: string;

    createdAt: Date;

    constructor (name: string, username: string) {
        this.name = name; this.username = username;
    }
}