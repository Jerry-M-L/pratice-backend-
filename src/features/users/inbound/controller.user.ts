import { UserService } from "../domain/service.user";  
import { Router, type Request, type Response } from "express";

export function UserController(userService: UserService) {

    const router = Router();

    router.post("/users", async (req: Request, res: Response) => {
        const user = req.body;
        const createdUser = await userService.createUser(user);
        res.status(201).json(createdUser);
    });

    router.put("/users/:id", async (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ message: "Identifiant manquant" });
        const updatedUser = await userService.updateUser(id);
        if (updatedUser) {
            return res.status(200).json(updatedUser);
        }
        return res.status(404).json({ message: "Utilisateur introuvable" });
    });

    router.delete("/users/:id", async (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ message: "Identifiant manquant" });
        const deleted = await userService.deleteUser(id);
        if (deleted) {
            return res.status(200).json({ message: "Utilisateur supprimé avec succès" });
        }
        return res.status(404).json({ message: "Utilisateur introuvable" });
    });

    return router;
}