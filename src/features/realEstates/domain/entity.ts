/**
 * Module domaine - RealEstates (biens immobiliers)
 *
 * Définit le type `RealEstate` et l'interface `RealEstateRepository`.
 * Utilisé par la couche service pour effectuer des opérations métiers simples.
 */
export type RealEstate = {
    id: string;
    title: string;
    description?: string;
    // type métier : propriété, location ou vente
    type: 'propriete' | 'location' | 'vente';
    price: number;
    address: string;
    ownerId?: string;
    createddate: string;
    status?: string;
}

export interface RealEstateRepository {
    /**
     * Crée un bien immobilier et retourne l'entité persistée.
     */
    create(re: RealEstate): Promise<RealEstate>;

    /**
     * Met à jour un bien (patch optionnel) et retourne l'entité mise à jour ou undefined si introuvable.
     */
    update(id: string, patch?: Partial<RealEstate>): Promise<RealEstate | undefined>;

    /**
     * Supprime et retourne true si la suppression a eu lieu.
     */
    delete(id: string): Promise<boolean>;

    /**
     * Recherche par identifiant.
     */
    findById(id: string): Promise<RealEstate | undefined>;

    /**
     * Recherche par type (ex: 'location').
     */
    findByType(type: string): Promise<RealEstate[]>;
}
