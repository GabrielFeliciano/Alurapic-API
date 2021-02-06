import { BadRequestException, Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { User } from "./user.entity";
import UserService from "./user.service";

interface ValidationOption {
    message: string
}

@Injectable()
@ValidatorConstraint()
export class IsUsernameUniqueConstraint implements ValidatorConstraintInterface {

    constructor (
        private userService: UserService
    ) {}

    validate (username: string, args: ValidationArguments): boolean {
        return !this.userService.searchUserByUsername(username);
    }

    defaultMessage? (ValidationArguments: ValidationArguments): string {
        throw new BadRequestException(`Username ${ValidationArguments.value} already exist`);
    }
}

export function IsUsernameUnique(validationOptions?: ValidationOptions) {
    return function (user: User, username: string) {
      registerDecorator({
        target: user.constructor,
        propertyName: username,
        options: validationOptions,
        constraints: [],
        validator: IsUsernameUniqueConstraint,
      });
    };
  }