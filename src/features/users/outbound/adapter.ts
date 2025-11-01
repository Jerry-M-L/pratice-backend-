import type{ User, UserRepository } from "../domain/entity.js";

export class InMemoryUserRepository implements UserRepository {
    private store = new Map<string, User>();

    private generateId(): string {
        return (
            Date.now().toString(36) +
            Math.random().toString(36).slice(2, 8)
        );
    }

    async create(user: User): Promise<User> {
        const id = user.id ?? this.generateId();
        const now = new Date().toISOString();
        const record: User = {
            ...user,
            id,
            createddate: now,
        };
        this.store.set(id, record);
        return record;
    }

    async update(id: string): Promise<User | undefined> {
        const existing = this.store.get(id);
        if (!existing) return undefined;
        const updated: User = {
            ...existing,
        };
        this.store.set(id, updated);
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        return this.store.delete(id);
    }

    async findByEmail(email: string): Promise<User> {
        for (const user of this.store.values()) {
            if (user.email === email) return user;
        }
        throw new Error(`User with email "${email}" not found`);
    }
}