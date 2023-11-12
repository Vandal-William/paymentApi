const checkCardNumber = require('../middlewares/checkCardNumber');
const checkCardExpirationDate = require('../middlewares/checkCardExpirationDate');
const createOrder = require('../middlewares/createOrders');

/**
 * Module de gestion des paiements.
 *
 * @module payment
 */

/**
 * Vérifie la validité du numéro de carte de crédit et de la date d'expiration avant de créer une commande.
 *
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 *
 */
const payment = {

    /**
     * Vérifie la validité du numéro de carte de crédit et de la date d'expiration avant de créer une commande.
     *
     * @param {Object} req.body - Les données de la requête contenant le numéro de carte et la date d'expiration.
     * @param {string} req.body.cardNumber - Le numéro de carte de crédit à vérifier.
     * @param {string} req.body.dateExpiration - La date d'expiration de la carte au format 'MM/YY'.
     *
     * @returns {void}
     * 
     */
    verify: (req, res) => {
        const { cardNumber, dateExpiration } = req.body;

        // Vérifie la validité du numéro de carte de crédit
        const isValidCreditCardNumber = checkCardNumber(cardNumber);

        // Vérifie la validité de la date d'expiration
        const isValidCreditCardExpirationDate = checkCardExpirationDate(dateExpiration);

        // Si le numéro de carte et la date d'expiration sont valides, crée une commande
        if (isValidCreditCardNumber && isValidCreditCardExpirationDate) {
            createOrder(req, res);
        }
    }
};

module.exports = payment;
