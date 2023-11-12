// Importe le module de connexion à la base de données.
const connection = require('../data/client');

/**
 * Module responsable de la mise à jour des informations dans la base de données.
 * @typedef {Object} UpdateInDatabaseModule
 * @property {Function} productStock - Met à jour le stock d'un produit dans la base de données.
 */

/**
 * Module responsable de la mise à jour des informations dans la base de données.
 * @type {UpdateInDatabaseModule}
 */
const updateInDatabase = {

    /**
     * Met à jour le stock d'un produit dans la base de données.
     * @function
     * @async
     * @param {number} productId - L'identifiant du produit dont le stock doit être mis à jour.
     * @param {number} quantity - La quantité à soustraire du stock existant.
     * @throws {Error} Une erreur si la mise à jour du stock échoue.
     */
    productStock: async (productId, quantity) => {
        try {
            // Récupération du produit depuis la base de données
            const selectQuery = `
                SELECT *
                FROM product
                WHERE product.id = $1
            `;
            const selectValues = [productId];

            const selectResult = await connection.query(selectQuery, selectValues);

            // Vérifie si le produit existe
            if (selectResult.rows[0]) {
                // Récupération des informations du produit
                const product = selectResult.rows[0];

                // Calcul de la nouvelle quantité en stock
                const newProductQuantity = product.inventory - quantity;

                // Mise à jour du stock dans la base de données
                const updateQuery = `
                    UPDATE product
                    SET inventory = $1
                    WHERE id = $2;
                `;
                const updateValues = [newProductQuantity, productId];

                await connection.query(updateQuery, updateValues);
            }
        } catch (error) {
            // En cas d'erreur, logue l'erreur et renvoie une erreur
            console.error("Erreur lors de la mise à jour du stock du produit :", error);
            throw new Error("Erreur lors de la mise à jour du stock du produit");
        }
    }
};

// Exporte le module de mise à jour de la base de données.
module.exports = updateInDatabase;
