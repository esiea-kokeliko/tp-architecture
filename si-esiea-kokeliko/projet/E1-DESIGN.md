# Design du projet

## Modèle de données

![alt text](https://i.imgur.com/iLcZOQC.png)

## Projet WEB

Projet séparé en 2 applications : 
- une API pour la gestion des données
- une application cliente pour la vue utilisateur

![alt text](https://i.imgur.com/HFG85P2.png)

#### Route de l'API

- GET /travel (liste tous les trajets disponible, c'est la vue qui permettra de filter sur les aéroports)
- POST /reserve (formulaire contenant l'identifiant du voyage, ainsi que possiblement un code user (si non fournis, on en renvoie un))
- GET /user/{code} (liste tous les tickets pour un utilisateur)

S'il y a du temps, proposer une interface SWAGGER.

### SPOF

Afin d'éviter tout dysfonctionnement, on pourra répliquer l'API et l'application cliente sur plusieurs machines.
Afin d'assurer que la base de données contienne toujours la vérité, elle sera non répliquée, et donc notre "Single Point Of Failure".

### SPOT

On considère que c'est la base de données qui contient la vérité.

## CI / CD

### CI

Si on a le temps pour l'implémentation de test, on pourra les automatiser dans une CI

### CD

On pourra, automatiser la mise en production du projet à partir de la CD