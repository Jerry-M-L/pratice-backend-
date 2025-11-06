export type RealEstate = {
    id: string;
    title: string;
    description?: string;
    type: 'propriete' | 'location' | 'vente';
    price: number;
    address: string;
    ownerId?: string;
    createddate: string;
    status?: string;
}

export interface RealEstateRepository {
    create(re: RealEstate): Promise<RealEstate>;
    update(id: string, patch?: Partial<RealEstate>): Promise<RealEstate | undefined>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<RealEstate | undefined>;
    findByType(type: string): Promise<RealEstate[]>;
}
