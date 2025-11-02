import { RealEstateService } from "../domain/service.realEstate";
import { Router, type Request, type Response } from "express";

/**
 * Controller Express pour les biens immobiliers (RealEstates).
 *
 * Routes exposées :
 * - POST /realestates       -> création (payload dans req.body)
 * - PUT  /realestates/:id   -> mise à jour (id dans params, patch dans body)
 * - DELETE /realestates/:id -> suppression
 * - GET /realestates/:id    -> récupération par id
 * - GET /realestates?type=  -> liste filtrée par type
 */
export function RealEstateController(service: RealEstateService) {
    const router = Router();

    // Création d'un bien
    router.post("/realestates", async (req: Request, res: Response) => {
        const payload = req.body; // doit correspondre au type RealEstate partiel
        const created = await service.createRealEstate(payload);
        return res.status(201).json(created);
    });

    // Mise à jour (patch optionnel)
    router.put("/realestates/:id", async (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ message: "Identifiant manquant" });
        const patch = req.body;
        const updated = await service.updateRealEstate(id, patch);
        if (updated) return res.status(200).json(updated);
        return res.status(404).json({ message: "Bien immobilier introuvable" });
    });

    // Suppression
    router.delete("/realestates/:id", async (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ message: "Identifiant manquant" });
        const deleted = await service.deleteRealEstate(id);
        if (deleted) return res.status(200).json({ message: "Supprimé avec succès" });
        return res.status(404).json({ message: "Bien immobilier introuvable" });
    });

    // Récupération par id
    router.get("/realestates/:id", async (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ message: "Identifiant manquant" });
        const found = await service.getById(id);
        if (found) return res.status(200).json(found);
        return res.status(404).json({ message: "Bien immobilier introuvable" });
    });

    // Liste filtrée par type (ex: /realestates?type=location)
    router.get("/realestates", async (req: Request, res: Response) => {
        const type = (req.query.type as string) ?? undefined;
        if (type) {
            const list = await service.findByType(type);
            return res.status(200).json(list);
        }
        // Par défaut on retourne une liste vide; on peut étendre pour retourner tous les biens
        return res.status(200).json([]);
    });

    return router;
}
