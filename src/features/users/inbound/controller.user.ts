import { UserService } from "../domain/service.user";   
import {Router, type Request, type Response} from "express";

export function UserController(userService: UserService) {

    const router = Router();
    router.post("/users", async (req: Request, res: Response) => {
        const user = req.body;
        const createdUser =  await userService.createUser(user);
        res.status(201).json(createdUser);
    }
    );

    router.put("/users/:id", async (req: Request, res: Response) => {
        const id = req.params.id;
        const updatedUser = await userService.updateUser(id);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    });

    router.delete("/users/:id", async (req: Request, res: Response) => {
        const id = req.params.id;
        const deleted = await userService.deleteUser(id);   
        if (deleted) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    });
    
}