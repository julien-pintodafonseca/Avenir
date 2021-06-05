# Description du projet

L'application mobile Avenir a pour objectif de fournir à ses utilisateurs un moyen simple de suivre leurs investissements en cryptomonnaies comme le Bitcoin, l'Ethereum ou encore le Litecoin.  

* Avenir permet de **tenir gratuitement un portefeuille personnel** composé de vos cryptommonaies (à ajouter manuellement pour plus de flexibilité) ainsi que de **suivre vos performances en direct**.  
* Avenir permet également de **suivre en temps réel les données du marché**. (*)  

(*) : fonctionnalité réservée aux utilisateurs premium.  

Projet CAW, Ensimag, 2021.  

# Cas d'usage

![Diagramme de cas d'usage](./doc/UseCase.png)

# Maquette / les différents écrans

![Maquette](./doc/MockUp.png)

# Modèle de données

![DataModel](./doc/DataModel.png)

# API back-end

TODO

# Choix techniques

## Webservices utilisés

TODO

## Gestion des rôles

Au sein de l'application, il y a 4 rôles différents :
* **Utilisateur non authentifié** : il s'agit du rôle par défaut au lancement de l'application sans être connecté.
* **Utilisateur authentifié** : il s'agit du rôle par défaut une fois connecté.
* **Utilisateur premium authentifié** : ce rôle est attribué à un utilisateur authentifié, une fois que celui-ci a entré un coupon premium valide au sein du panel utilisateur (écran "Profil").
* **Administrateur** : ce rôle doit être attribué manuellement via la base de données.

La gestion des rôles s'effectue grâce à la table "users" :
* **Utilisateur authentifié** : user avec is_admin à 0 et id_premium_voucher à NULL.
* **Utilisateur premium authentifié** : user avec is_admin à 0 et un id_premium_voucher correspondant à un premium_voucher valide.
* **Administrateur** : user avec is_admin à 1.

Pour plus de précisions, se référer à la section "Cas d'usage", "Maquette" et/ou "Modèle de données" ci-dessus.

## Structure projet

![ProjectStructure](./doc/ProjectStructure.png)

# Screencast

TODO

# Back-end

Open a terminal :

```sh
$ git clone https://gitlab.ensimag.fr/pintodaj/avenir # or clone your own fork
$ cd avenir
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

# Front-end

Open a terminal :

```sh
$ cd avenir/ui
$ npm install
$ npm start
```

Open another terminal :

```sh
$ cd avenir/ui
$ npm run android # or "npm run ios" for ios
```

Your app should now be running on your emulator/device.

# Tests

TODO

