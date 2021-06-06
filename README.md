# Description du projet

L'application mobile Avenir a pour objectif de fournir à ses utilisateurs un moyen simple de suivre leurs investissements en cryptomonnaies comme le Bitcoin, l'Ethereum ou encore le Litecoin.

* Avenir permet de **tenir gratuitement un portefeuille personnel** composé de vos cryptommonaies (à ajouter manuellement pour plus de flexibilité) ainsi que de **suivre vos performances en direct**.
* Avenir permet également de **suivre en temps réel les données du marché***.

(*) : fonctionnalité réservée aux utilisateurs premium.

Projet CAW, Ensimag, 2021.  

# Cas d'usage

![Diagramme de cas d'usage](./doc/UseCase.png)

# Maquette / les différents écrans

![Maquette](./doc/MockUp.png)

# Modèle de données

![DataModel](./doc/DataModel.png)

# API back-end

| Path | GET | POST | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /account/login | CR 405 | Permet de soumettre son email et son mot de passe pour se connecterCR 202 ou 403 | CR 405 | CR 405 |
| /account/registration | CR 405 | Créé un nouvel utilisateur en envoyant trois variables : email, password1, password2CR 201 ou 400 | CR 405 | CR 405 |
| /api/cryptocurrency | Donne toutes les données du marché de toutes les cryptomonnaiesCR 200 | CR 405 | CR 405 | CR 405 |
| /api/cryptocurrency/id | Donne la description d&#39;une cryptomonnaie dont l&#39;ID est IDCR 200 | CR 405 | CR 405 | CR 405 |
| /api/wallet | Donne la description du portefeuille de l&#39;utilisateur en fonction du token de connexionCR 200 | CR 405 | CR 405 | CR 405 |
| /api/wallet/symbols | Donne la description de toutes les cryptomonnaiesCR 200 | CR 405 | CR 405 | CR 405 |
| /api/wallet/id/amount | CR 405 | Créé une cryptomonnaie dont l&#39;ID est id et le montant est amount dans le portefeuille de l&#39;utilisateurCR 201 ou 400 | CR 405 | CR 405 |
| /api/wallet/id | CR 405 | CR 405 | Modifie le montant de la cryptomonnaie du portefeuille de l&#39;utilisateur. Le montant est renseigné par la variable amountCR 200 ou 400 | Supprime la cryptomonnaie dont l&#39;ID est id du portefeuille de l&#39;utilisateurCR 200 |
| /api/profile | Donne la description du profil de l&#39;utilisateurCR 200 | Ajoute un coupon premium pour l&#39;utilisateur dont le code coupon est renseigné dans la variable voucherCR 200 ou 400 | Modifie le mot de passe de l&#39;utilisateur renseigné dans les variables password1 et password2CR 200 ou 400 | CR 405 |
| /api/admin | Donne la description complète de toutes les cryptomonnaies de l&#39;API externe coinmarketCR 200 | CR 405 | CR 405 | CR 405 |
| /api/admin/symbols | Donne la description complète de toutes les cryptomonnaiesCR 200 | CR 405 | CR 405 | CR 405 |
| /api/admin/id/name/symbol | CR 405 | Ajoute une cryptomonnaie dans notre API en renseignant l&#39;ID, son nom et son symboleCR 201 ou 400 | CR 405 | CR 405 |
| /api/admin/id/active | CR 405 | CR 405 | Modifie la visibilité de la cryptomonnaie dont l&#39;ID est idCR 200 ou 400 | CR 405 |

# Choix techniques

## Webservices utilisés

L'application Avenir utilise pour le moment l'**API de CoinMarketCap** sur le plan le plus basique, soit avec une clé gratuite.  
Les limitations actuelles sont donc les suivantes :
* 9 endpoints disponibles sur les 22 existants
* 10.000 appels API par mois maximum
* Aucune historisation des appels
* Utilisation non commerciale

De par l'objectif d'évolution de l'application Avenir et de l'arrivé de notre future boutique de vente de coupons premium très prochainement, il est prévu, dans un futur proche, d'investir dans un abonnement permettant de passer outre les contraintes citées ci-dessus.

Les fonctions appelant l'**API de CoinMarketCap** se situent exclusivement au sein du fichier **avenir/services/coinMarket.js**.
Celles-ci s'occupent principalement de récupérer les différentes données du marché (nom des cryptomonnaies, leur symbole, leur prix actuel, le volume des transactions sur 24h, le % d'évolution du prix sur les derières heures...) à intervalle régulier.

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

## Lancer le serveur

Ouvrir un terminal et saisir :

```sh
$ git clone https://gitlab.ensimag.fr/pintodaj/avenir # or clone your own fork
$ cd avenir
$ npm install
$ npm start
```

Le back-end de l'application devrait maintenant être lancé sur [localhost:5000](http://localhost:5000/).

# Front-end

## Lancer l'application

Ouvrir un premier terminal et saisir :

```sh
$ cd avenir/ui
$ npm install
$ npm start
```

Ouvrir un second terminal et saisir :

```sh
$ cd avenir/ui
$ npm run android # or "npm run ios" for ios
```

L'application devrait maintenant être lancée sur votre émulateur/appareil.

## Lint

Ouvrir un terminal et saisir :

```sh
$ cd avenir/ui
$ npm run lint
```

# Tests

TODO

