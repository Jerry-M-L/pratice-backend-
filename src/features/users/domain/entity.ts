/**
 * Module domaine - Users
 *
 * Ce fichier définit :
 * - le type `User` (forme d'un utilisateur dans l'application)
 * - l'interface `UserRepository` (contrat attendu par la couche domaine)
 *
 * Contrat / attentes :
 * - create: enregistre et retourne l'utilisateur créé (ex : avec id et createddate)
 * - update: met à jour l'utilisateur identifié par id et retourne l'entité mise à jour ou undefined si introuvable
 * - delete: supprime et retourne true si la suppression a eu lieu
 * - findByEmail: retourne l'utilisateur existant ou lance une erreur si non trouvé
 */
export type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    createddate: string;
}

export interface UserRepository {
    /**
     * Crée un utilisateur et retourne l'entité persistée.
     * Le repository est responsable de générer l'id et la date de création si nécessaire.
     */
    create(user: User): Promise<User>;

    /**
     * Met à jour l'utilisateur identifié par `id`. Retourne l'utilisateur mis à jour ou `undefined` si introuvable.
     */
    update(id: string): Promise<User | undefined>;

    /**
     * Supprime l'utilisateur et retourne `true` si la suppression a réussi.
     */
    delete(id: string): Promise<boolean>;

    /**
     * Recherche un utilisateur par email.
     * Doit renvoyer l'utilisateur ou lancer une erreur si non trouvé (contrat actuel du projet).
     */
    findByEmail(email: string): Promise<User>;
}