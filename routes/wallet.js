var express = require('express');
var router = express.Router();

router
    .get('/', function(req, res) {
        console.log("GET Wallet");
        res.status(200).send({ msg: 'Wallet' })
    })
    .get('/symbols', function(req, res) {
        global.db.all('SELECT name, symbol FROM cryptocurrencies', [],
            (error, data) => {
            if (error)
            {
                console.debug(error)
                res.status(500).send('Erreur'); return
            }
            console.log(data)
            res.status(202).send({ data }); return
        })
    })
    .post('/:symbol', function(req, res) {
        console.log("POST Wallet");
    })
    .delete('/:symbol', function(req, res) {
        console.log("DELETE Wallet");
    })

module.exports = router;