const express = require('express')
const router = express.Router()

router
  .use(function isPremium (req, res, next) {
    try {
      if (req.voucher) {
        console.debug('ok premium')
        global.db.get('select voucher, is_valid, expiration_date from premium_vouchers where id = ?', [req.voucher],
          (error, data) => {
            if (error) {
              console.debug(error)
              res.status(500).send({ error: 'Internal Server Error' }); return
            }
            if (data && data.is_valid === 1) {
              console.debug(`{Voucher ${data.voucher} is valid}`)
              if (data.expiration_date <= Math.round(Date.now() / 1000)) {
                res.status(403).send({ error: 'Your voucher has expired' }); return
              }
              next()
            } else {
              res.status(403).send({ error: 'Your voucher is not valid' })
            }
          }
        )
      } else {
        res.status(403).send('Forbidden !'); return
      }
    } catch {
      res.status(403).send('Forbidden !')
    }
  })
  .get('/', function (req, res) {
    global.db.all('SELECT c.name, c.symbol, m.id_cryptocurrency, max(m.id), m.price, m.volume_24h, m.cmc_rank, m.percent_change_1h, m.percent_change_24h, m.percent_change_7d FROM market m inner join cryptocurrencies c on m.id_cryptocurrency = c.id group by m.id_cryptocurrency order by m.cmc_rank', [],
      (error, data) => {
        if (error) {
          console.debug(error)
          res.status(500).send('Internal Server Error'); return
        }
        res.status(200).send({ data })
      })
  })
  .get('/:id', function(req, res){
    const id = Number(req.params.id);
    if (isNaN(id) || id < 1)
    {
        res.status(400).send({ error: ":id must be a number higher or equal to 1" }); return
    }
    global.db.all('select timestamp, price from market where id_cryptocurrency = ?', [id],
        (error, data) => {
            if (error) {
                console.debug(error)
                res.status(500).send({ error: 'Internal Server Error' }); return
            }
            let list_time = []
            let list_price = []
            data.map(function (item) { list_time.push(item.timestamp), list_price.push(item.price) })
            res.status(200).send({ list_time, list_price }); return
        }
    )
})

module.exports = router
