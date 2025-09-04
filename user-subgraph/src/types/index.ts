export type Message = {
    msg: string;
    error: boolean;
    code: string;
};

export type User = {
    id: string;
    email: string;
    name: string;
    createdAt: string;
};

export type UserInput = {
    email: string;
    name: string;
};

export type UserTable = Omit<User, "id"> & {userId: string};