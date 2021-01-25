# The Game

## Architecture Micro Services

- http://localhost:3000 : Users API

## Commandes utiles au fonctionnement du projet

### Docker

- Démarrer les services Docker
  `docker-compose up`

- Stoper les services
  `CTRL + C`

- Démarrer les services Docker et reprendre la main dans le terminal
  `docker-compose up -d`

- Liste des services en cours d'exécution
  `docker-compose ps`

- Accès au container Docker avec Bash (le nom du container est indiqué dans le fichier ./docker-compose.yml ou peut-être connu via la commande ci-avant)
  `docker exec -ti <nom-du-container> bash`
- Installation d'un module NPM directement depuis le container Docker en cours d'exécution (après avoir executé la commande ci-avant)
  `npm i <nom-du-module>`

- Sortir du Bash du container
  `exit`

- Installation sans passer par le Bash du container
  `docker exec -ti npm i <nom-du-module>`

- Installation des dépendances NPM directement dans le container Docker via l'exuction de la commande renseignée au niveau de l'attribut "command" du fichier ./docker-compose.yml :

  `bash -c "npm i && npm start"`

- Hot reloading du serveur Node.js (attribut "command" du fichier ./docker-compose.yml) :

  `bash -c "npm i && npm run dev"`

## Adminer

- Si la base de données thegame existe, connexion à l'interface avec utilisateur thegame :

  - serveur = thegame.users.db
  - utilisateur = thegame
  - base de données = thegame
  - mot de passe = (cf. ./users_db/.env MYSQL_PASSWORD)

- Si la base de données "the game" n'existe pas encore, se connecter avec l'utilisateur root

  - serveur = thegame.users.db
  - utilisateur = root
  - base de données =
  - mot de passe = (cf. ./users_db/.env MYSQL_ROOT_PASSWORD)

- En cas de problème de connexion à la base de données, supprimer le dossier ./users_db et redémarrer les services

`sudo rm -rf users_db`

---

**Ce projet est exclusivement destiné à l'enseignement.**

Remarques, suggestions, corrections... bienvenues.

---

**Alexandre Leroux**

alex@sherpa.one

_Enseignant vacataire à l'Université de Lorraine_

- IUT Nancy-Charlemagne (LP Ciasie)

- Institut des Sciences du Digital (Masters Sciences Cognitives)
