
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum Roles {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER"
}

export interface UserInput {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface IMutation {
    createUser(input: UserInput): User | Promise<User>;
    login(input: UserInput): LoginResponse | Promise<LoginResponse>;
    deleteUser(username: string): boolean | Promise<boolean>;
    activateUser(id: string): User | Promise<User>
}

export interface IQuery {
    hello(): string | Promise<string>;
    user(): User[] | Promise<User[]>;
    me(): User | Promise<User>;
}

export interface User {
    _id: string;
    username: string;
    password: string;
    role: Roles;
}
