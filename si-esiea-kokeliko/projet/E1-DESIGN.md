# Design du projet

## Modèle de données

![alt text](https://i.imgur.com/i1Txo1F.png)

Explication :

Il y a des trajets (Travel) entre les aéroports.

Un utilisateur (User) peut faire une réservation (Reservation) avec un ou plusieurs billets (Ticket).

Un billet concerne un trajet. 

On utilise une table (dénormalisé) entre Travel et Ticket afin de pouvoir récupérer facilement, le cout, la date et le nombre de billet disponible pour un trajet.

## Projet WEB

Projet séparé en 2 applications : 
- une API pour la gestion des données
- une application cliente pour la vue utilisateur

Celles-ci utiliseront l'architecture logicielle DDD :

![alt text](https://i.imgur.com/o6Ihfed.png)

Un client fera une requête à l'application cliente, celle-ci ira ensuite requeter l'api pour l'accès aux données.

L'application client sera codée en Javascript avec Vue.js et Vuetify.

L'API sera codée en Javascript avec Express.

#### Route de l'API

- GET /travels (liste tous les trajets disponible, c'est la vue qui permettra de filter sur les aéroports)
- POST /book (formulaire contenant l'identifiant du voyage, ainsi que l'email de l'utilisateur)
- GET /user/{email} (liste tous les tickets pour un utilisateur)

S'il y a du temps, proposer une interface SWAGGER.

### Basé sur une infrastructure 3 tiers

![alt text](https://i.imgur.com/GzMjXav.png)

On a choisi d'utiliser MariaDB pour la base de données car c'est une base gratuite et simple d'utilisation.

## CI / CD

### CI

Si on a le temps pour l'implémentation de test, on pourra les automatiser dans une CI

### CD

On pourra, automatiser la mise en production du projet à partir de la CD