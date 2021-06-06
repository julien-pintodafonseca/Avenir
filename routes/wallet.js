var express = require('express');
var router = express.Router();

router
    .get('/', function(req, res) {
        global.db.all('SELECT name, symbol, quantity, price, quantity * price as total FROM wallets_cryptocurrencies a INNER JOIN users b on b.id = a.id_user INNER JOIN cryptocurrencies c on c.id = a.id_cryptocurrency INNER JOIN (SELECT id_cryptocurrency, max(id), price FROM market group by id_cryptocurrency) d on d.id_cryptocurrency = c.id where b.id = ? order by total', [req.id],
            (error, data) => {
            if (error)
            {
                console.debug(error)
                res.status(500).send('Internal Server Error'); return
            }
            res.status(200).send({ data }); return
        })
    })
    .get('/symbols', function(req, res) {
        global.db.all('SELECT id, name, symbol FROM cryptocurrencies', [],
            (error, data) => {
            if (error)
            {
                console.debug(error)
                res.status(500).send('Internal Server Error'); return
            }
            res.status(200).send({ data }); return
        })
    })
    .post('/:id/:amount', function(req, res) {
        const id = Number(req.params.id);
        const amount = Number(req.params.amount);
        if (isNaN(id) || id <= 0)
        {
            res.status(400).send({ error: ":id must be a number higher or equal to 1" }); return
        }
        if (isNaN(amount) || amount <= 0)
        {
            res.status(400).send({ error: ":amount must be a number higher to 0" }); return
        }
        global.db.run("INSERT INTO wallets_cryptocurrencies(id_user, id_cryptocurrency, quantity) values(?, ?, ?)",
        [req.id, id, amount], function (error) {
            if (error) {
                console.debug(error);
                res.status(500).send('Internal Server Error'); return
            }
            res.status(201).send({ msg: 'ok' })
        })
    })
    .delete('/:id', function(req, res) {
        global.db.run("DELETE FROM wallets_cryptocurrencies where id_user = ? and id_cryptocurrency = ?",
        [req.id, req.params.id], function (error) {
            if (error) {
                console.debug(error);
                res.status(500).send('Internal Server Error'); return
            }
            res.status(200).send({ msg: 'ok' })
        })
    })
    .put('/:id', function(req, res) {
        const id = Number(req.params.id);
        const amount = Number(req.body.amount);
        if (isNaN(id) || id <= 0)
        {
            res.status(400).send({ error: ":id must be a number higher or equal to 1" }); return
        }
        if (isNaN(amount) || amount <= 0)
        {
            res.status(400).send({ error: ":amount must be a number higher to 0" }); return
        }
        global.db.run("UPDATE wallets_cryptocurrencies SET quantity = ? where id_user = ? and id_cryptocurrency = ?",
        [amount, req.id, id], function (error) {
            if (error) {
                console.debug(error);
                res.status(500).send('Internal Server Error'); return
            }
            res.status(200).send({ msg: 'ok' })
        })
    })

module.exports = router;