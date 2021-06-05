# Description du projet

Ce projet a pour but de créer une application mobile, "Avenir", fournissant aux utilisateurs un moyen simple de suivre leurs investissements en cryptomonnaies comme le Bitcoin, l'Ethereum ou encore le Litecoin.  

* Avenir permet de tenir gratuitement un portefeuille personnel composé de vos cryptommonaies (à ajouter manuellement pour plus de flexibilité) ainsi que de suivre vos performances en direct.  
* Avenir permet également de suivre en temps réel les données du marché des cryptommonaies souhaitées. (*)  

(*) : fonctionnalité réservée aux utilisateurs premium.  

Projet CAW, Ensimag.  
Equipe G, 2021.  

# Cas d'usage

![Diagramme de cas d'usage](./doc/UseCase.png)

# Maquette / les différents écrans

![Maquette](./doc/MockUp.png)





# Node-js-getting-started alternative for Ensimag/Phelma 

A Node.js app with GPS and USER using [Express 4](http://expressjs.com/).

This application supports the [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://gitlab.ensimag.fr/viardots/backend_heroku_caw.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku main
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
