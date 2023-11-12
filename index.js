/**
 * Charge les variables d'environnement à partir d'un fichier .env.
 */
require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./router');
const expressSession = require('express-session');
const port = 3000;

/**
 * Utilise le middleware pour analyser les URL encodées et les JSON dans les requêtes.
 * @middleware
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Configure la session Express avec une clé secrète, sans resauvegarde forcée, et autorise les nouvelles sessions non initialisées.
 * @middleware
 */
app.use(expressSession({
  secret: 'votre_secret_key',
  resave: false,
  saveUninitialized: true
}));

/**
 * Utilise le routeur défini dans ./router.js pour gérer les différentes routes.
 * @router
 */
app.use(router);

/**
 * Démarre le serveur sur le port spécifié.
 * @event
 * @listens port
 */
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
