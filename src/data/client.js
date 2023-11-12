/**
 * Module pour la connexion à la base de données PostgreSQL.
 * @typedef {Object} PostgreSQLClientModule
 * @property {Function} connect - Établit une connexion à la base de données PostgreSQL.
 */

/**
 * Client PostgreSQL pour la connexion à la base de données.
 * @type {PostgreSQLClientModule}
 */
const { Client: pgClient } = require('pg');
/**
 * Instance du client PostgreSQL.
 * @type {Object}
 * @property {string} password - Mot de passe pour la connexion à la base de données.
 * @property {string} user - Nom d'utilisateur pour la connexion à la base de données.
 * @property {string} database - Nom de la base de données à laquelle se connecter.
 * @property {string} host - URL du serveur PostgreSQL.
 */
const client = new pgClient({
    connectionString: process.env.PG_URL + "?sslmode=require",
});

/**
 * Établit une connexion à la base de données PostgreSQL.
 * @function
 */
client.connect();

// Exporte le client PostgreSQL.
module.exports = client;
