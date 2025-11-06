import type { RealEstate, RealEstateRepository } from './entity.js';

export class RealEstateService {
    constructor(private repo: RealEstateRepository) {}

    async createRealEstate(re: RealEstate): Promise<RealEstate> {
        return this.repo.create(re);
    }

    async updateRealEstate(id: string, patch?: Partial<RealEstate>): Promise<RealEstate | undefined> {
        return this.repo.update(id, patch);
    }

    async deleteRealEstate(id: string): Promise<boolean> {
        return this.repo.delete(id);
    }

    async getById(id: string): Promise<RealEstate | undefined> {
        return this.repo.findById(id);
    }

    async findByType(type: string): Promise<RealEstate[]> {
        return this.repo.findByType(type);
    }
}
