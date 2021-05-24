const express = require('express');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3').verbose();
const session = require('express-session');
const tokenService = require('./services/token');
const coinMarketService = require('./services/coinMarket');

const account = require('./routes/account.js');
const cryptocurrency = require('./routes/cryptocurrency.js');
const wallet = require('./routes/wallet.js');

require('mandatoryenv').load(['SECRET', 'DB']);
const DEBUG = process.env.DEBUG || false

if (!DEBUG) { console.debug = () => {} }

global.db = new sqlite.Database(process.env.DB)

const app = express()

/*
setInterval(() => {
  coinMarketService.selectCryptocurrencies();
}, coinMarketService.CALL_TIMER);
*/

app
  .use(require('cookie-parser')())
  .use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }))
  // Permet le passage de paramètres en POST
  .use(bodyParser.urlencoded({ extended: true }))
  // Egalement en JSON
  .use(bodyParser.json())
  // Log toutes les requêtes pour aider au debug
  .use((req, res, next) => {
    console.debug(`${req.method} url:${req.url} req.query:${JSON.stringify(req.query)}` +
                ` / req.body:${JSON.stringify(req.body)} req.cookies:${JSON.stringify(req.cookies)}`)
    next()
  })
  // Tous les accès à l'API doivent avoir un Token d'accès valide,
  // On utilise ici un middleware fait sur mesure qui vérifie le token
  // et l'utilisateur présent dans le Token est enregistré pour req.user pour les requêtes /api/xxx
  .use('/api', (req, res, next) => {
    try {
      let payload
      if (!req.headers.authorization ||
          !(payload = tokenService.verifyAndGetPayload(req.headers.authorization)) ||
          !(payload = JSON.parse(payload)) || !(payload.scope) ||
          !(payload.scope.includes('api'))
      ) { res.status(403).send('Accès interdit'); return }
      JSON.parse(tokenService.verifyAndGetPayload(req.headers.authorization))
      req.user = payload.sub
      next()
    } catch {
      res.status(403).send('Accès interdit')
    }
  })

  .use('/account', account)
  .use('/api/cryptocurrency', cryptocurrency)
  .use('/api/wallet', wallet)

module.exports = app
