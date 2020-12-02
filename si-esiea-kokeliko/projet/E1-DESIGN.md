# Design du projet

## Modèle de données

- Airport (id, name,  code (unique))
- Travel (id, start-airport-id, end-airport-id)
- Ticket (id, cost, travel-id, reservation-id)
- Reservation (id, user-id)
- User (id, code (unique))

### Base de données

On utilisera une base de données MariaDb pour le stockage.

## Projet WEB

Projet séparé en 2 applications : 
- une API pour la gestion des données
- une application cliente pour la vue utilisateur

### API (REST)

Serveur codé en Javascript avec Nodes.js.

Utilisation de l'architecture DDD organisé ainsi :
- Domain
    - Model (classe correspond aux entités dans la BDD)
    - BusinessRule (en général des function static)
    - RepositoryInterface (les méthodes d'accès aux données)
- Application
    - Gestion des processus de l'application, utilisation de 3 types de fichier : 
        - Action (demande d'action à l'application)
        - Handler (gestion de l'action) / Checker (vérification de quelque chose)
        - View (possible rendu du résultat)
- Présentation
    - Tout ce qui visible en input / output pour l'utilisateur (dans le cas d'une API : les modèles sérialiser pour la sortie)
- Infrastructure
    - Contient les Repository (implémentés) pour l'accès à la base
    - Ainsi que les composants externes, les Helper, ...

#### Route de l'API

- GET /flight (liste tous les vols, c'est la vue qui permettra de filter sur les aéroports)
- POST /reserve (formulaire contenant le code de l'aréport de départ et de celui d'arrivé, ainsi que possiblement un code user (si non fournis, on en renvoie un))
- GET /user/{code} (liste tous les tickets pour un utilisateur)

S'il y a du temps, proposer une interface SWAGGER.

### Application cliente

Application codé en Javascript avec Vue.js / Vuetify en One-Page sur "/".

Utilisation de l'architecture DDD organisé ainsi :
- Domain
    - Model (classe correspondant au ressource récupérées via l'API)
    - RepositoryInterface (les méthodes d'accès aux données)
- Application
    - Gestion de l'affichage
- Présentation
    - Template
- Infrastructure
    - Contient les Repository (implémentés) pour l'accès à l'API
    - Ainsi que les composants externes, les Helper, ...
    
## Architecture réseau (architecture 3-tiers)

On sera en mode IaaS, on fournira à un externe des containers auquels on aura accès, on le laissera gérer les serveurs, le network et le stockage.

On découpera le projet en plusieurs containers docker :
    - API Server
    - Application cliente
    - Base de données
    
Ainsi on pourra ouvrir vers l'extérieur l'application cliente et mettre un filtre IP sur l'API correspondant au container de l'application cliente.
Le but de cela est de pouvoir dans un premier tout héberger sur une seule machine, mais en laissant la possibilité dans un second temps de séparer les containers sur plusieurs machines pour éviter une charge trop élévée.

Chaque container sera sur un OS Debian.

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