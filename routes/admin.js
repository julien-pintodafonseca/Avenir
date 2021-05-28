var express = require('express');
var router = express.Router();
const coinMarketService = require('../services/coinMarket');

router
    .use(function isAdmin(req, res, next){
        try{
            if (req.admin !== 1)
            {
                res.status(403).send('Forbidden !'); return 
            }
            next()
        }
        catch
        {
            res.status(403).send('Forbidden !'); return 
        }
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
                    res.status(202).send( list_crypto ); return
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).send({ error: 'Internal Server Error' }); return
            })
    })
    .post("/:id/:name/:symbol", function(req, res){
        global.db.run("INSERT INTO cryptocurrencies(id, name, symbol, is_active) values(?, ?, ?, ?)",
        [req.params.id, req.params.name, req.params.symbol, 1], function (error) {
            if (error) {
                console.debug(error);
                res.status(500).send('Internal Server Error'); return
            }
            res.status(201).send({ msg: 'ok' })
        })
    })
    .put("/:id/:active", function(req, res) {
        global.db.run("UPDATE cryptocurrencies SET is_active = ? where id = ?",
        [ req.params.active, req.params.id], function (error) {
            if (error) {
                console.debug(error);
                res.status(500).send('Internal Server Error'); return
            }
            res.status(201).send({ msg: 'ok' })
        })
    })
    .get('/symbols', function(req, res) {
        global.db.all('SELECT id, name, symbol, is_active FROM cryptocurrencies', [],
            (error, data) => {
            if (error)
            {
                console.debug(error)
                res.status(500).send('Internal Server Error'); return
            }
            res.status(202).send({ data }); return
        })
    })


module.exports = router;