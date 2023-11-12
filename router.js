const express = require('express');
const router = express.Router();

// Importation des contrôleurs
const products = require('./controllers/products');
const shopping = require('./controllers/shopping');
const payment = require('./controllers/payment');

/**
 * Router Express pour gérer les routes liées aux produits, aux commandes, au panier et au paiement.
 * @namespace
 */

/**
 * Route pour récupérer tous les produits.
 * @name GET /products/allProducts
 * @function
 */
router.get('/products/allProducts', products.getAll);

/**
 * Route pour récupérer un produit spécifique en fonction de son identifiant.
 * @name GET /products/oneProduct/:id
 * @function
 * @param {string} :id - Identifiant du produit.
 */
router.get('/products/oneProduct/:id', products.getOne);

/**
 * Route pour récupérer le contenu du panier.
 * @name GET /shoppingCart/getCart
 * @function
 */
router.get('/shoppingCart/getCart', shopping.getCart);

/**
 * Route pour ajouter un produit au panier.
 * @name POST /shopping/addToCart
 * @function
 */
router.post('/shopping/addToCart', shopping.addToCart);

/**
 * Route pour le processus de paiement et la vérification du paiement.
 * @name POST /order/paymentProcess
 * @function
 */
router.post('/order/paymentProcess', payment.verify);

/**
 * Route POST pour mettre à jour la quantité d'un article dans le panier d'achat.
 * @name POST /shopping/updateQuantity
 * @function
 */
router.post('/shopping/updateQuantity', shopping.updateArticleQuantity);

/**
 * Route POST pour supprimer un article du panier d'achat.
 * @name POST /shopping/deleteArticle
 * @function
 */
router.post('/shopping/deleteArticle', shopping.deleteArticle);

// Exporte le router Express.
module.exports = router;
