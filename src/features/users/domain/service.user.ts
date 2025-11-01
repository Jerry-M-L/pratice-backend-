import { type User, type UserRepository } from "./entity";
export class UserService {
    constructor(private userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    async createUser(user:User) : Promise<User> {
        return this.userRepository.create(user);
    }
    async updateUser(id:string) : Promise<User | undefined> {
        return this.userRepository.update(id);
    }
    async deleteUser(id:string) : Promise<boolean> {
        return this.userRepository.delete(id);
    }
    async getUserByEmail(email:string) : Promise<User> {
        return this.userRepository.findByEmail(email);
    }

}