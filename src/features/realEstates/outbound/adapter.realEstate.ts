import type { RealEstate, RealEstateRepository } from "../domain/entity.js";

export class InMemoryRealEstateRepository implements RealEstateRepository {
    private store = new Map<string, RealEstate>();

    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    }

    async create(re: RealEstate): Promise<RealEstate> {
        const id = re.id ?? this.generateId();
        const now = new Date().toISOString();
        const record: RealEstate = { ...re, id, createddate: now };
        this.store.set(id, record);
        return record;
    }

    async update(id: string, patch?: Partial<RealEstate>): Promise<RealEstate | undefined> {
        const existing = this.store.get(id);
        if (!existing) return undefined;
        const updated: RealEstate = { ...existing, ...(patch ?? {}) } as RealEstate;
        this.store.set(id, updated);
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        return this.store.delete(id);
    }

    async findById(id: string): Promise<RealEstate | undefined> {
        return this.store.get(id);
    }

    async findByType(type: string): Promise<RealEstate[]> {
        const res: RealEstate[] = [];
        for (const v of this.store.values()) {
            if (v.type === type) res.push(v);
        }
        return res;
    }
}
