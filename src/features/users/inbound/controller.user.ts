import { UserService } from "../domain/service.user";  
import { Router, type Request, type Response } from "express";

/**
 * Controller Express pour le module Users
 *
 * Expose un Router express avec les routes suivantes :
 * - POST /users       -> créer un utilisateur (payload dans req.body)
 * - PUT  /users/:id   -> mettre à jour un utilisateur (id dans params)
 * - DELETE /users/:id -> supprimer un utilisateur
 *
 * Remarques :
 * - Ce controller délègue toute la logique au `UserService` injecté.
 * - Les validations légères (présence d'id) sont faites ici ; la validation de payload peut être ajoutée.
 */
export function UserController(userService: UserService) {

    const router = Router();

    // Créer un utilisateur
    router.post("/users", async (req: Request, res: Response) => {
        // On s'attend à recevoir l'objet user dans le body. Le service/repository complètera id/createddate.
        const user = req.body;
        const createdUser = await userService.createUser(user);
        res.status(201).json(createdUser);
    });

    // Mettre à jour un utilisateur (ici l'implémentation demande seulement l'id) ;
    // en pratique on passerait un patch dans req.body.
    router.put("/users/:id", async (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ message: "Identifiant manquant" });
        const updatedUser = await userService.updateUser(id);
        if (updatedUser) {
            return res.status(200).json(updatedUser);
        }
        // Réponse en français si non trouvé
        return res.status(404).json({ message: "Utilisateur introuvable" });
    });

    // Supprimer un utilisateur
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