const fetchInDataBase = require('../dataMapers/fetchInDataBase');

/**
 * @typedef {Object} Article
 * @property {number} id - L'identifiant unique de l'article.
 * @property {string} name - Le nom de l'article.
 * @property {number} price - Le prix unitaire de l'article.
 * @property {string} image - L'URL de l'image associée à l'article.
 * @property {number} quantity - La quantité d'articles dans le panier.
 * @property {number} totalPrice - Le prix total pour la quantité d'articles dans le panier.
 */

/**
 * Module gérant les opérations liées au panier d'achats.
 * @module shopping
 */
const shopping = {

    /**
     * Récupère le contenu actuel du panier d'achat de l'utilisateur.
     * Vérifie la disponibilité en stock de chaque article dans le panier.
     *
     * @function
     * @async
     * @memberof shopping
     * @param {Object} req - L'objet de requête Express.
     * @param {Object} res - L'objet de réponse Express.
     * @throws {Error} Une erreur si la récupération du panier échoue.
     * @returns {JSON} - Une réponse JSON contenant le contenu du panier et les éventuelles erreurs.
     *
     * @example
     * // Requête HTTP GET
     * getCart(req, res);
     * // Réponse JSON en cas de succès :
     * // {
     * //   "shoppingCart": [
     * //      { "id": 1, "name": "Product1", "price": 20, "quantity": 2, "totalPrice": 40 },
     * //      { "id": 2, "name": "Product2", "price": 30, "quantity": 1, "totalPrice": 30 }
     * //   ],
     * //   "errors": []
     * // }
     * // Réponse JSON en cas d'échec (panier vide) :
     * // { "shoppingCart": [], "errors": [{ "error": "Le panier est vide" }] }
     * // Réponse JSON en cas d'échec (erreur interne) :
     * // { "error": "Erreur lors de la récupération du panier" }
     */
    getCart: async (req, res) => {
        try {
            // Récupère le panier actuel de la session ou initialise un tableau vide.
            const shoppingCart = req.session.shoppingCart || [];
            // Initialise un tableau pour stocker les erreurs liées aux articles du panier.
            const errors = [];

            // Vérifie si le panier est vide.
            if (shoppingCart.length === 0) {
                return res.json({ shoppingCart: [], errors: [{ error: "Le panier est vide" }] });
            }

            // Utilise Promise.all pour traiter de manière asynchrone chaque article du panier.
            const updatedCart = await Promise.all(shoppingCart.map(async (article) => {
                try {
                    // Vérifie la disponibilité en stock de l'article.
                    const isAvailableInStock = await fetchInDataBase.verifyProductStock(article.id, article.quantity);
                    if (isAvailableInStock) {
                        // Si l'article est disponible, le renvoie dans le panier mis à jour.
                        return article;
                    } else {
                        // Si l'article n'est pas disponible, ajoute une erreur et renvoie null.
                        errors.push({ error: `L'article ${article.name} n'est plus disponible dans la quantité demandée` });
                        return null;
                    }
                } catch (error) {
                    // En cas d'erreur lors de la vérification du stock, logue l'erreur et propage l'erreur.
                    console.error("Erreur lors de la vérification du stock d'un article :", error);
                    throw error;
                }
            }));

            // Filtre les articles du panier pour exclure ceux qui ne sont pas disponibles.
            const filteredCart = updatedCart.filter(article => article !== null);

            // Renvoie une réponse JSON contenant le panier mis à jour et les erreurs éventuelles.
            res.json({ shoppingCart: filteredCart, errors });
        } catch (error) {
            // En cas d'erreur lors de la récupération du panier, logue l'erreur et renvoie une réponse JSON d'erreur.
            console.error("Erreur lors de la récupération du panier :", error);
            res.status(500).json({ error: "Erreur lors de la récupération du panier" });
        }
    },

    

    
    /**
     * Ajoute un article au panier d'achat de l'utilisateur. Vérifie la disponibilité en stock
     * avant d'ajouter l'article au panier. Si l'article est déjà présent dans le panier,
     * met à jour la quantité. Renvoie des réponses JSON indiquant le statut de l'opération.
     *
     * @function
     * @async
     * @memberof shopping
     * @param {Object} req - L'objet de requête Express.
     * @param {Object} res - L'objet de réponse Express.
     * @throws {Error} Une erreur si l'ajout de l'article au panier échoue.
     * @returns {JSON} - Une réponse JSON indiquant le statut de l'ajout de l'article au panier.
     *
     * @example
     * // Requête HTTP POST avec le corps de la requête :
     * // { "id": 1, "name": "Product", "price": 20, "image": "url", "quantity": 2 }
     * addToCart(req, res);
     * // Réponse JSON en cas de succès :
     * // { "message": "Article ajouté au panier avec succès" }
     * // Réponse JSON en cas d'échec (quantité en stock insuffisante) :
     * // { "message": "Le produit n'est plus disponible dans la quantité choisie" }
     * // Réponse JSON en cas d'échec (erreur interne) :
     * // { "error": "Erreur lors de l'ajout d'un article au panier" }
     */
    addToCart: async (req, res) => {
        try {
            // Récupère les données de la requête (identifiant, nom, prix, image, quantité).
            const { id, name, price, image, quantity } = req.body;

            /** @type {Article} */
            // Crée un objet représentant l'article avec les détails fournis.
            const article = {
                id: id,
                name: name,
                price: price,
                image: image,
                quantity: quantity,
                totalPrice: price * quantity
            };

            // Initialise ou récupère le panier actuel de la session.
            req.session.shoppingCart = req.session.shoppingCart || [];

            // Vérifie la disponibilité en stock de la quantité demandée.
            const isAvailableInStock = await fetchInDataBase.verifyProductStock(id, quantity);

            if (isAvailableInStock) {
                // Recherche l'index de l'article existant dans le panier (s'il existe).
                const existingArticleIndex = req.session.shoppingCart.findIndex(item => item.id === id);

                if (existingArticleIndex !== -1) {
                    // Si l'article est déjà présent, met à jour la quantité.
                    req.session.shoppingCart[existingArticleIndex].quantity += quantity;
                    res.json({ message: 'Article ajouté au panier avec succès'});
                } else {
                    // Si l'article n'est pas présent, ajoute l'article au panier.
                    req.session.shoppingCart.push(article);
                    res.json({ message: 'Article ajouté au panier avec succès'});
                }
            } else {
                // Renvoie une réponse JSON indiquant que la quantité en stock est insuffisante.
                res.json({ message: "Le produit n'est plus disponible dans la quantité choisie" });
            }
        } catch (error) {
            // En cas d'erreur, logue l'erreur et renvoie une réponse JSON d'erreur.
            console.error("Erreur lors de l'ajout d'un article au panier :", error);
            res.status(500).json({ error: "Erreur lors de l'ajout d'un article au panier" });
        }
    },


    /**
     * Met à jour la quantité d'un article dans le panier. Vérifie la disponibilité en stock
     * avant de modifier la quantité.
     *
     * @function
     * @async
     * @memberof shopping
     * @param {Object} req - L'objet de requête Express.
     * @param {Object} res - L'objet de réponse Express.
     * @throws {Error} Une erreur si la mise à jour de la quantité échoue.
     * @returns {JSON} - Une réponse JSON indiquant le statut de la mise à jour de la quantité.
     *
     * @example
     * // Requête HTTP POST avec le corps de la requête :
     * // { "id": 1, "quantity": 5 }
     * updateArticleQuantity(req, res);
     * // Réponse JSON en cas de succès :
     * // { "message": "La quantité a été modifiée avec succès" }
     * // Réponse JSON en cas d'échec (quantité en stock insuffisante) :
     * // { "error": "La quantité en stock est insuffisante pour le moment" }
     * // Réponse JSON en cas d'échec (article non présent dans le panier) :
     * // { "error": "L'article n'est pas présent dans le panier" }
     */
    updateArticleQuantity: async (req, res) => {
        try {
            // Récupère les données de la requête (identifiant et nouvelle quantité).
            const { id, quantity } = req.body;
            // Récupère le panier actuel de la session ou initialise un tableau vide.
            const shoppingCart = req.session.shoppingCart || [];

            // Vérifie la disponibilité en stock de la nouvelle quantité.
            const isAvailableInStock = await fetchInDataBase.verifyProductStock(id, quantity);

            if (isAvailableInStock) {
                // Recherche l'article dans le panier par son identifiant.
                const article = shoppingCart.find(article => article.id === id);

                if (article) {
                    // Met à jour la quantité de l'article dans le panier.
                    article.quantity = quantity;
                    // Renvoie une réponse JSON indiquant le succès de la mise à jour.
                    res.json({ message: "La quantité a été modifiée avec succès" });
                } else {
                    // Renvoie une réponse JSON indiquant que l'article n'est pas présent dans le panier.
                    res.status(404).json({ error: "L'article n'est pas présent dans le panier" });
                }
            } else {
                // Renvoie une réponse JSON indiquant que la quantité en stock est insuffisante.
                res.status(400).json({ error: "La quantité en stock est insuffisante pour le moment" });
            }
        } catch (error) {
            // En cas d'erreur, logue l'erreur et renvoie une réponse JSON d'erreur.
            console.error("Erreur lors de la mise à jour de la quantité d'un article :", error);
            res.status(500).json({ error: "Erreur lors de la mise à jour de la quantité d'un article" });
        }
    },

    
    /**
     * Supprime un article du panier d'achat de l'utilisateur en fonction de son identifiant.
     *
     * @function
     * @memberof shopping
     * @param {Object} req - L'objet de requête Express.
     * @param {Object} res - L'objet de réponse Express.
     * @throws {Error} Une erreur si la suppression de l'article du panier échoue.
     * @returns {JSON} - Une réponse JSON indiquant le statut de la suppression de l'article du panier.
     *
     * @example
     * // Requête HTTP POST avec le corps de la requête :
     * // { "id": 1 }
     * deleteArticle(req, res);
     * // Réponse JSON en cas de succès :
     * // { "message": "L'article a été supprimé du panier avec succès" }
     * // Réponse JSON en cas d'échec (article non présent dans le panier) :
     * // { "error": "L'article n'est pas présent dans le panier" }
     * // Réponse JSON en cas d'échec (erreur interne) :
     * // { "error": "Erreur lors de la suppression de l'article du panier" }
     */
    deleteArticle: (req, res) => {
        try {
            // Récupère l'identifiant de l'article à supprimer depuis le corps de la requête.
            const { id } = req.body;
            // Récupère le panier actuel de la session.
            const shoppingCart = req.session.shoppingCart;

            // Recherche l'index de l'article dans le panier.
            const articleIndex = shoppingCart.findIndex(article => article.id === id);

            // Vérifie si l'article existe dans le panier.
            if (articleIndex !== -1) {
                // Utilise la méthode splice pour retirer l'article du panier.
                shoppingCart.splice(articleIndex, 1);
                res.json({ message: "L'article a été supprimé du panier avec succès" });
            } else {
                // Renvoie une réponse JSON indiquant que l'article n'est pas présent dans le panier.
                res.status(404).json({ error: "L'article n'est pas présent dans le panier" });
            }
        } catch (error) {
            // En cas d'erreur, logue l'erreur et renvoie une réponse JSON d'erreur.
            console.error("Erreur lors de la suppression d'un article du panier :", error);
            res.status(500).json({ error: "Erreur lors de la suppression de l'article du panier" });
        }
    },

    
};

module.exports = shopping;
