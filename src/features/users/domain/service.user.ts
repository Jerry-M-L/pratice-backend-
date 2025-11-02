import { type User, type UserRepository } from "./entity";

/**
 * Service applicatif pour les Users.
 *
 * Rôle : exposer les opérations métiers simples (création, mise à jour, suppression, recherche)
 * en s'appuyant sur un `UserRepository` injecté.
 *
 * Contrat :
 * - Le service délègue la persistance au repository et ne gère pas la validation exhaustive.
 * - Les erreurs provenant du repository (ex : utilisateur introuvable) remontent vers l'appelant.
 */
export class UserService {
    constructor(private userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Crée un utilisateur via le repository et retourne l'entité créée.
     * Input : objet `User` (peut ne pas contenir id ni createddate).
     */
    async createUser(user: User): Promise<User> {
        return this.userRepository.create(user);
    }

    /**
     * Met à jour un utilisateur identifié par `id`.
     * Retour : `User | undefined` si non trouvé.
     */
    async updateUser(id: string): Promise<User | undefined> {
        return this.userRepository.update(id);
    }

    /**
     * Supprime un utilisateur identifié par `id`.
     * Retour : `true` si supprimé, sinon `false`.
     */
    async deleteUser(id: string): Promise<boolean> {
        return this.userRepository.delete(id);
    }

    /**
     * Récupère un utilisateur par email.
     * Selon l'implémentation du repository, cette méthode peut lancer une erreur si l'utilisateur n'existe pas.
     */
    async getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findByEmail(email);
    }

}