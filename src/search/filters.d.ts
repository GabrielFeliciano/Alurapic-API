export interface QueryUserByName {
    name: string,
    caseSensitive: boolean
}

export interface QueryUsersByName {
    names: string[],
    caseSensitive: boolean
}

export interface QueryUserByUsername {
    username: string
}