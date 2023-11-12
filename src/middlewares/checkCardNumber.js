/**
 * Vérifie si un numéro de carte de crédit est valide et correspond à une carte Visa ou MasterCard.
 *
 * @param {string} cardNumber - Le numéro de carte de crédit à vérifier.
 * @returns {boolean} - True si le numéro de carte est valide pour Visa ou MasterCard, sinon false.
 *
 * @example
 * const isValid = checkCardNumber('1234-5678-9012-3456');
 * console.log(isValid); // Output: true
 */
function checkCardNumber(cardNumber) {
    // Supprimez les espaces et les tirets du numéro de carte
    const cleanedCardNumber = cardNumber.replace(/[\s-]/g, '');

    // Vérifiez si le numéro de carte correspond à une carte Visa ou MasterCard
    if (/^4\d{15}$/.test(cleanedCardNumber)) {
        // Le numéro de carte correspond à une carte Visa (commence par 4 et a une longueur de 16 chiffres)
        return true;
    } else if (/^5[1-5]\d{14}$/.test(cleanedCardNumber)) {
        // Le numéro de carte correspond à une carte MasterCard (commence par 5, suivi de 1 à 5, et a une longueur de 16 chiffres)
        return true;
    }

    // Si le numéro de carte ne correspond à aucun des modèles, considérez-le comme invalide
    return false;
}

module.exports = checkCardNumber;
