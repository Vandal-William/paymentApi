// Module responsable de la création d'une nouvelle commande dans la base de données.
// Importer le module de connexion à la base de données.
const connection = require('../data/client');

/**
 * Objet contenant des fonctions liées à la création d'enregistrements dans la base de données.
 * @namespace
 */
const createInDataBase = {

    /**
     * Insère une nouvelle commande dans la base de données.
     *
     * @async
     * @function
     * @memberof createInDataBase
     * @param {string} sessionId - L'identifiant de session associé à la commande.
     * @param {number} productId - L'identifiant du produit commandé.
     * @param {number} price - Le prix unitaire du produit.
     * @param {number} quantity - La quantité commandée.
     * @param {number} TotalpricePerUnit - Le montant total pour une unité du produit (prix unitaire * quantité).
     * @returns {Promise<void>} Une promesse résolue une fois l'insertion terminée avec succès.
     * @throws {Error} Une erreur si l'insertion échoue.
     */
    newOrder: async (sessionId, productId, price, quantity, TotalpricePerUnit) => {
        try {
            // Requête SQL pour insérer une nouvelle commande dans la table 'orders'.
            const query = `
                INSERT INTO orders (sessionId, productId, price, quantity, TotalpricePerUnit)
                VALUES ($1, $2, $3, $4, $5);
            `;
            // Tableau de valeurs à insérer dans la requête.
            const values = [
                sessionId,
                productId,
                price,
                quantity,
                TotalpricePerUnit
            ];
        
            // Exécute la requête SQL en utilisant la connexion à la base de données.
            await connection.query(query, values);
        } catch (error) {
            console.error("Erreur lors de l'insertion d'une nouvelle commande:", error);
            throw error;
        }
    },
};

// Exporte l'objet createInDataBase avec la fonction newOrder pour être utilisé dans d'autres modules.
module.exports = createInDataBase;
