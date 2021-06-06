const express = require('express')
const router = express.Router()
const coinMarketService = require('../services/coinMarket')

router
    .use(function isAdmin(req, res, next){
        if (req.admin !== 1)
        {
            res.status(403).send({ error: 'Forbidden !' }); return 
        }
        next()
    })
    .get("/", function(req, res) {
        const path = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map"
        const cryptocurrencies = coinMarketService.getCryptocurrenciesMarket(path)
        cryptocurrencies
            .then(response => {
                if(response.data)
                {
                    let list_crypto = []
                    for (const v in response.data.data)
                    {
                        const crypto = response.data.data[v]
                        const id = crypto.id;
                        const rank = crypto.rank;
                        const name = crypto.name;
                        const symbol = crypto.symbol;
                        const first_historical_data = crypto.first_historical_data;
                        const last_historical_data = crypto.last_historical_data;
                        list_crypto.push({ id, rank, name, symbol, first_historical_data, last_historical_data})
                    }
                    global.db.all('SELECT id FROM cryptocurrencies', [], 
                        (error, data) => {
                        if (error)
                        {
                            console.debug(error)
                            res.status(500).send({ error: 'Internal Server Error' }); return
                        }
                        for (const o of data)
                        {
                            let removeIndex = list_crypto.map(function(item) { return item.id; }).indexOf(o.id);
                            list_crypto.splice(removeIndex, 1)
                        }
                        res.status(200).send({ list_crypto }); return
                    });
                    
                }
            })
            .catch(error => {
                console.debug(error);
                res.status(500).send({ error: 'Internal Server Error' }); return
              }
              for (const o of data) {
                const removeIndex = list_crypto.map(function (item) { return item.id }).indexOf(o.id)
                list_crypto.splice(removeIndex, 1)
              }
              res.status(200).send({ list_crypto })
            })
        }
      })
      .catch(error => {
        console.debug(error)
        res.status(500).send({ error: 'Internal Server Error' })
      })
  })
  .post('/:id/:name/:symbol', function (req, res) {
    const id = Number(req.params.id)
    if (isNaN(id) || id <= 0) {
      res.status(400).send({ error: ':id must be a number higher or equal to 1' }); return
    }

    global.db.run('INSERT INTO cryptocurrencies(id, name, symbol, is_active) values(?, ?, ?, ?)',
      [req.params.id, req.params.name, req.params.symbol, 1], function (error) {
        if (error) {
          console.debug(error)
          res.status(500).send('Internal Server Error'); return
        }
        res.status(201).send({ msg: 'ok' })
      })
  })
  .put('/:id/:active', function (req, res) {
    const id = Number(req.params.id)
    const active = Number(req.params.active)

    if (isNaN(id) || id <= 0) {
      res.status(400).send({ error: ':id must be a number higher or equal to 1' }); return
    }
    if (isNaN(active) || (active !== 0 && active !== 1)) {
      res.status(400).send({ error: ':active is 0 or 1' }); return
    }
    global.db.run('UPDATE cryptocurrencies SET is_active = ? where id = ?',
      [active, id], function (error) {
        if (error) {
          console.debug(error)
          res.status(500).send({ error: 'Internal Server Error' }); return
        }
        res.status(200).send({ msg: 'ok' })
      })
  })
  .get('/symbols', function (req, res) {
    global.db.all('SELECT id, name, symbol, is_active FROM cryptocurrencies', [],
      (error, data) => {
        if (error) {
          console.debug(error)
          res.status(500).send({ error: 'Internal Server Error' }); return
        }
        res.status(200).send({ data })
      })
  })

module.exports = router
