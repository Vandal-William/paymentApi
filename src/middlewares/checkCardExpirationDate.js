/**
 * Vérifie si une date d'expiration de carte de crédit est valide en comparaison avec la date actuelle.
 *
 * @param {string} dateExpiration - La date d'expiration de la carte au format 'MM/YY'.
 * @returns {boolean} - True si la date d'expiration est valide, sinon false.
 *
 * @example
 * const isValidDate = checkCardExpirationDate('12/23');
 * console.log(isValidDate); // Output: true
 */
function checkCardExpirationDate(dateExpiration) {
    // Obtenez l'année et le mois actuels
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Les mois commencent à partir de zéro

    // Séparez l'année et le mois de la date d'expiration et convertissez-les en nombres
    const [expYear, expMonth] = dateExpiration.split('/').map(Number);

    // Vérifiez si la date d'expiration est antérieure à la date actuelle
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        // La date d'expiration est antérieure à la date actuelle, donc elle n'est pas valide
        return false;
    } else {
        // La date d'expiration est égale ou postérieure à la date actuelle, donc elle est valide
        return true;
    }
}

module.exports = checkCardExpirationDate;
