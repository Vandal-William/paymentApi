const fetchInDataBase = require('../dataMapers/fetchInDataBase');

/**
 * Objet contenant des méthodes pour gérer les produits.
 * @namespace
 * @property {Function} getAll - Récupère tous les produits depuis la base de données.
 * @property {Function} getOne - Récupère un produit spécifique depuis la base de données.
 */
const products = {

    /**
     * Récupère tous les produits depuis la base de données.
     * @function
     * @async
     * @param {Object} req - Objet de requête Express.
     * @param {Object} res - Objet de réponse Express.
     * @returns {Promise<void>} - Aucune valeur de retour directe, les produits sont envoyés en réponse.
     */
    getAll: async (req, res) => {
        try {
            const products = await fetchInDataBase.allProducts();
            console.log(products);
            res.json(products);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération de tous les produits :", error);
            res.status(500).json({error: "Erreur lors de la récupération des produits"});
        }
    },

    /**
     * Récupère un produit spécifique depuis la base de données.
     * @function
     * @async
     * @param {Object} req - Objet de requête Express avec le paramètre d'URL 'id'.
     * @param {Object} res - Objet de réponse Express.
     * @returns {void} - Aucune valeur de retour directe, le produit est envoyé en réponse.
     */
    getOne: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await fetchInDataBase.oneProduct(id);
            res.json(product);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération d'un produit :", error);
            res.status(500).json({error: "Erreur lors de la récupération du produit"});
        }
    }
};

// Exporte l'objet 'products'.
module.exports = products;
