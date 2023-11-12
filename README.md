# API REST

## MCD

<img src="./src/images/application de paiement(MCD).png">

## Endpoints

Base URL: http://localhost:3000

| URI                       | Verbe | Contrôleurs            | Paramètres / formulaire                               | Résumé                              |
|---------------------------|-------|------------------------|-------------------------------------------------------|-------------------------------------|
| /products/allProducts     | GET   | products               | null                                                  | Afficher tous les produits          |
| /products/oneProduct      | GET   | products               | productId                                             | Afficher le détail d'un produit     |
| /shopping/getCart         | GET   | shopping               | null                                                  | Afficher le panier                  |
| /shopping/addToCart       | POST  | shopping               | formulaire {id, name, price, image, quantity}         | Ajouter un produit au panier        |
| /shopping/updateQuantity  | POST  | shopping               | formulaire {id, quantity}                             | Modifier la quantité d'un article dans le panier |
| /shopping/deleteArticle   | POST  | shopping               | formulaire {id}                                       | Supprimer un article du panier      |
| /order/payment            | POST  | payment                | formulaire {cardNumber, dateExpiration}               | Vérifier les informations de paiement et, si valides, déclencher une commande |

## Créer la base de données MySQL

```shell
sudo -u postgres psql
```
```shell
CREATE USER u WITH PASSWORD 'user';
```
```shell
CREATE DATABASE pdt;
```
```shell
GRANT ALL PRIVILEGES ON DATABASE pdt TO u;
```
```shell
\q
```
## Provisionner la base de données

Ouvrez le terminal de commande à la racine du projet :

```shell
psql -U  u -d pdt -a -f ./data/products_table.sql
```

### Pour voir le résultat

```shell
psql -U u -d pdt
```
Effectuez une requête sur la table Products :

```shell
select * from product;
```
Si vous voyez des données, tout est bon.

## Dépendances et démarrage du serveur

### Dépendances :

- dotenv : pour les variables d'environnement
- express : framework utilisé pour créer un serveur avec Node.js
- express-session : pour créer une session
- nodemon : pour démarrer le projet
- pg : module PostgreSQL pour se connecter à la base de données PostgreSQL

### Démarrage du serveur

Dans le terminal à la racine du projet, tapez les commandes suivantes :

Pour installer les dépendances :

```shell
yarn
```
ou

```shell
npm i
```
Pour démarrer le serveur :

```shell
nodemon
```


