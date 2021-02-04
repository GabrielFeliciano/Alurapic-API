export interface FilterUserByItsName {
    name: string,
    caseSensitive: boolean
}

export interface FilterUsersByTheirName {
    names: string[],
    caseSensitive: boolean
}