import { RealEstateService } from "../domain/service.realEstate";
import { Router, type Request, type Response } from "express";

export function RealEstateController(service: RealEstateService) {
    const router = Router();

    router.post("/realestates", async (req: Request, res: Response) => {
        const payload = req.body;
        const created = await service.createRealEstate(payload);
        return res.status(201).json(created);
    });

    router.put("/realestates/:id", async (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ message: "Identifiant manquant" });
        const patch = req.body;
        const updated = await service.updateRealEstate(id, patch);
        if (updated) return res.status(200).json(updated);
        return res.status(404).json({ message: "Bien immobilier introuvable" });
    });

    router.delete("/realestates/:id", async (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ message: "Identifiant manquant" });
        const deleted = await service.deleteRealEstate(id);
        if (deleted) return res.status(200).json({ message: "Supprimé avec succès" });
        return res.status(404).json({ message: "Bien immobilier introuvable" });
    });

    router.get("/realestates/:id", async (req: Request, res: Response) => {
        const id = req.params.id as string;
        if (!id) return res.status(400).json({ message: "Identifiant manquant" });
        const found = await service.getById(id);
        if (found) return res.status(200).json(found);
        return res.status(404).json({ message: "Bien immobilier introuvable" });
    });

    router.get("/realestates", async (req: Request, res: Response) => {
        const type = (req.query.type as string) ?? undefined;
        if (type) {
            const list = await service.findByType(type);
            return res.status(200).json(list);
        }
        return res.status(200).json([]);
    });

    return router;
}
