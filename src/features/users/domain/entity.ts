export type User={
    id:string;
    name:string;
    email:string;
    phone:string;
    password:string;
    role:string;
    createddate:string;
}

export interface UserRepository{
    create(user:User): Promise<User>;
    update(id:string): Promise<User | undefined>;
    delete(id:string): Promise<boolean>;
    findByEmail(email:string): Promise<User>;
}