import type { RealEstate, RealEstateRepository } from './entity.js';

/**
 * Service applicatif pour les RealEstates.
 *
 * Il expose des opérations simples et délègue la persistance au repository injecté.
 */
export class RealEstateService {
    constructor(private repo: RealEstateRepository) {}

    /** Créer un bien immobilier */
    async createRealEstate(re: RealEstate): Promise<RealEstate> {
        return this.repo.create(re);
    }

    /** Mettre à jour un bien (patch optionnel) */
    async updateRealEstate(id: string, patch?: Partial<RealEstate>): Promise<RealEstate | undefined> {
        return this.repo.update(id, patch);
    }

    /** Supprimer un bien */
    async deleteRealEstate(id: string): Promise<boolean> {
        return this.repo.delete(id);
    }

    /** Récupérer un bien par identifiant */
    async getById(id: string): Promise<RealEstate | undefined> {
        return this.repo.findById(id);
    }

    /** Rechercher les biens par type (ex: 'location') */
    async findByType(type: string): Promise<RealEstate[]> {
        return this.repo.findByType(type);
    }
}
