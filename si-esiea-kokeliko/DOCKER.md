# Rappel

Accéder au shell du conteneur :
```bash
docker exec -it <nom_conteneur> bash
```

Accéder aux logs du conteneur :
```bash
docker logs <nom_conteneur>
```

Pour arrêter tous les containers qui tournent sur votre machine :
```bash
docker stop $(docker ps -aq)
```

Pour détruire tous vos containers :
```bash
docker rm $(docker ps -aq)
```

# Les conteneurs
## MariaDB

Télécharger une image stable sur docker hub :
```bash
docker pull mariadb:10.5.8
```

Démarrer le conteneur :
```bash
docker run --name bdd -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mariadb:10.5.8
```

Initialiser la base de données avec notre fichier sql :
```bash
docker exec -i bdd sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /some/path/on/your/host/all-databases.sql
```

Une fois le conteneur lancé et que des modifications ont été faites, il est possible de faire un dump de la BDD :
```bash
docker exec bdd sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > /some/path/on/your/host/all-databases.sql
```

### Rappel SQL

Accéder à la base de données du conteneur pour faire des requêtes :
```bash
docker exec -it bdd bash
mysql -u root -p
```

Création de la base de données :
```sql
CREATE DATABASE magasin;
USE magasin;
```

Création d'un table :
```sql
CREATE TABLE clients(num_client INT NOT NULL AUTO_INCREMENT PRIMARY KEY,nom VARCHAR(20), prenom VARCHAR(20));
```

insertion de données :
```sql
INSERT INTO clients VALUES (1,'John','Doe'),(2,'michel','Dupont');
```

Description de la base de données :
```sql
SHOW TABLES;
```

Description d'une table :
```sql
DESCRIBE clients;
```

## API

Afin de build l'image (Dockerfile) il est nécessaire de se trouver dans le répertoire de cette dernière puis d'exécuter la commande suivante :
```bash
docker build -t prog_distr_api .
```
- '-t' correspond au nom de l'image qui va être crée

Lancer le conteneur :
```bash
docker run -d -p 3000:3000 --name api prog_distr_api
```
- '-d' lancer le conteneur en tâche de fond
- '-p' natage du port 3000 entre le conteneur et l'hôte
- '--name' attribution d'un nom au conteneur qui sera exécuté

## Application

Afin de build l'image (Dockerfile) il est nécessaire de se trouver dans le répertoire de cette dernière puis d'exécuter la commande suivante :
```bash
docker build -t prog_distr_app .
```
- '-t' correspond au nom de l'image qui va être crée

Lancer le conteneur :
```bash
docker run -d -p 8080:8080 --name app prog_distr_app
```
- '-d' lance le conteneur en tâche de fond
- '-p' natage du port 8080 entre le conteneur et l'hôte
- '--name' attribution d'un nom au conteneur qui sera exécuté
