import type { User, UserRepository } from "../domain/entity.js";

/**
 * Implémentation en mémoire de `UserRepository`.
 *
 * Usage : utile pour le développement et les tests rapides. Ne doit pas être utilisé en production.
 */
export class InMemoryUserRepository implements UserRepository {
    // Map stockant les users en mémoire (clé = id)
    private store = new Map<string, User>();

    // Génère un id simple et unique pour l'exemple
    private generateId(): string {
        return (
            Date.now().toString(36) +
            Math.random().toString(36).slice(2, 8)
        );
    }

    // Create: insère et retourne l'entité créée (avec id et createddate)
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

    // Update: remplace l'enregistrement existant (ici on ne gère pas les patches détaillés)
    async update(id: string): Promise<User | undefined> {
        const existing = this.store.get(id);
        if (!existing) return undefined;
        const updated: User = {
            ...existing,
        };
        this.store.set(id, updated);
        return updated;
    }

    // Delete: supprime l'enregistrement et retourne un booléen
    async delete(id: string): Promise<boolean> {
        return this.store.delete(id);
    }

    // Recherche par email
    async findByEmail(email: string): Promise<User> {
        for (const user of this.store.values()) {
            if (user.email === email) return user;
        }
        // Lancer une erreur si non trouvé (conforme au contrat dans entity.ts)
        throw new Error(`Utilisateur avec l'email "${email}" introuvable`);
    }
}