var express = require('express');
var router = express.Router();

router
    .use(function isPremiumOrisAdmin(req, res, next){
        try{
            if (req.admin === 1)
            {
                console.debug( "ok admin" )
                next()
            }
            if (req.voucher)
            {
                console.debug("ok premium")
                global.db.get('select voucher, is_valid, expiration_date from premium_vouchers where id = ?', [req.voucher],
                    (error, data) => {
                        if (error) {
                            console.debug(error)
                            res.status(500).send({ error: 'Internal Server Error' }); return
                        }
                        if (data && data.is_valid === 1) 
                        {
                            console.debug(`{Voucher ${data.voucher} is valid}`)
                            if (data.expiration_date <= Math.round(Date.now() / 1000))
                            {
                                res.status(403).send({ error: 'Your voucher has expired' }); return
                            }
                            next()
                        }
                        else
                        {
                            res.status(403).send({ error: 'Your voucher is not valid' }); return
                    
                        }
                    }
                )
            }
            else
            {
                res.status(403).send('Forbidden !'); return
            } 
        } 
        catch 
        {
            res.status(403).send('Forbidden !')
        }
    })
    .get('/', function(req, res) {
        global.db.all('SELECT id_cryptocurrency, max(id), price, volume_24h, cmc_rank, percent_change_1h, percent_change_24h, percent_change_7d FROM market group by id_cryptocurrency order by cmc_rank', [],
            (error, data) => {
            if (error)
            {
                console.debug(error)
                res.status(500).send('Internal Server Error'); return
            }
            res.status(202).send({ data }); return
        })
    })
    .get('/:id', function(req, res){
        global.db.get('select timestamp, price from market where id_cryptocurrency = ?', [req.params.id],
            (error, data) => {
                if (error) {
                    console.debug(error)
                    res.status(500).send({ error: 'Internal Server Error' }); return
                }
            }
        )
    })

module.exports = router;