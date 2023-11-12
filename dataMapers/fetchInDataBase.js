const connection = require('../data/client');

/**
 * Module pour la récupération de données depuis la base de données.
 * @typedef {Object} FetchInDataBaseModule
 * @property {Function} allProducts - Récupère tous les produits depuis la base de données.
 * @property {Function} oneProduct - Récupère un produit spécifique depuis la base de données.
 * @property {Function} verifyProductStock - Vérifie le stock d'un produit.
 */

/**
 * Module pour la récupération de données depuis la base de données.
 * @type {FetchInDataBaseModule}
 */
const fetchInDataBase = {

    /**
     * Récupère tous les produits depuis la base de données.
     * @function
     * @async
     * @returns {Promise<Array>} Un tableau contenant tous les produits.
     */
    allProducts: async () => {
        try {
            const query = `SELECT * FROM product`;

            const result = await connection.query(query);
            return result.rows;
        } catch (error) {
            console.error("Erreur lors de la récupération de tous les produits:", error);
            throw error;
        }
    },

    /**
     * Récupère un produit spécifique depuis la base de données.
     * @function
     * @async
     * @param {number} productId - L'identifiant du produit à récupérer.
     * @returns {Promise<Object>} Un objet représentant le produit récupéré.
     */
    oneProduct: async (productId) => {
        try {
            const query = `SELECT * FROM product WHERE product.id = $1`;
            const values = [productId];

            const result = await connection.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erreur lors de la récupération d'un produit:", error);
            throw error;
        }
    },

    /**
     * Vérifie le stock d'un produit.
     * @function
     * @async
     * @param {number} productId - L'identifiant du produit à vérifier.
     * @param {number} quantity - La quantité à vérifier.
     * @returns {Promise<boolean>} True si le produit est en stock, sinon False.
     */
    verifyProductStock: async (productId, quantity) => {
        try {
            const query = `
                SELECT * 
                FROM product 
                WHERE product.id = $1
                AND product.inventory >= $2
            `;
            const values = [productId, quantity];

            const result = await connection.query(query, values);

            return result.rows.length > 0;
        } catch (error) {
            console.error("Erreur lors de la vérification du stock du produit:", error);
            throw error;
        }
    }
};

// Exporte le module de récupération de données.
module.exports = fetchInDataBase;
