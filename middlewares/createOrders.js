const createInDataBase = require('../dataMapers/createInDataBase');
const updateInDatabase = require('../dataMapers/updateInDataBase')
const fetchInDataBase = require('../dataMapers/fetchInDataBase');

/**
 * Crée une nouvelle commande en vérifiant et mettant à jour les stocks des produits dans le panier.
 *
 * @async
 * @function
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<Array>} - Un tableau d'erreurs rencontrées pendant le processus de création de la commande.
 */
async function createOrder(req, res) {
    try {
        // Récupération du panier en session
        const shoppingCart = req.session.shoppingCart;
        // Récupération de l'identifiant de session
        const sessionId = req.session.id;
        const errors = [];

        // Utilise Promise.all pour effectuer toutes les vérifications de stock simultanément
        await Promise.all(shoppingCart.map(async (article) => {
            const isAvailableInStock = await fetchInDataBase.verifyProductStock(article.id, article.quantity);

            if (isAvailableInStock) {
                // Création d'une nouvelle commande dans la base de données
                await createInDataBase.newOrder(sessionId, article.id, article.price, article.quantity, article.totalPrice);
                // Mise à jour des stocks des produits concernés
                await updateInDatabase.productStock(article.id, article.quantity);
            } else {
                errors.push({ error: `L'article ${article.name} n'a pu être ajouté à la commande car le stock est insuffisant` });
            }
        }));

        // Retourne le tableau d'erreurs, s'il y en a
        return errors;
    } catch (error) {
        console.error("Erreur lors de la création de la commande :", error);
        throw new Error("Erreur lors de la création de la commande");
    }
}


module.exports = createOrder;
