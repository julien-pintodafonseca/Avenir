const express = require('express')
const router = express.Router()
const validatePassword = require('./account.js').validatePassword
const bcrypt = require('bcrypt')

const salt = require('./account.js').SALT

router
  .get('/', function (req, res) {
    global.db.get('select email from users where id = ?', [req.id],
      (error, data) => {
        if (error) {
          console.debug(error)
          res.status(500).send({ error: 'Internal Server Error' }); return
        }
        if (data) {
          res.status(200).send({ data })
        }
      }
    )
  })
  .put('/', function (req, res) {
    const errors = []
    const password = req.body.password
    const password2 = req.body.password2
    const email = req.user
    validatePassword(errors, password, password2)
    if (errors.length !== 0) {
      res.status(403).send({ errors })
    } else {
      bcrypt.hash(password, salt, (err, hash) => {
        global.db.run('UPDATE users SET password = ? WHERE email = ?',
          [hash, email], function (error) {
            if (error) {
              console.debug(error)
              res.status(500).send('Internal Server Error'); return
            }
            res.status(200).send({ msg: 'ok' })
          })
        if (err) {
          console.debug(err)
          res.status(500).send('Internal Server Error')
        }
      })
    }
  })
  .post('/', function (req, res) {
    global.db.get('SELECT id, is_valid, expiration_date, date_of_use FROM premium_vouchers WHERE voucher = ?', [req.body.voucher],
      (error, data) => {
        if (error) {
          console.debug(error)
          res.status(500).send({ error: 'Internal Server Error' }); return
        }
        if (data) {
          if (data.is_valid === 1) {
            if (data.date_of_use === 0) {
              if (req.voucher == null) {
                updateVoucher(data.id, req.user)
                  .then(resolve => {
                    res.status(200).send({ msg: 'ok' })
                  })
                  .catch(reject => {
                    res.status(500).send({ error: 'Internal Server Error' })
                  })
              } else {
                global.db.get('SELECT expiration_date FROM premium_vouchers WHERE id = ?', [req.voucher],
                  (error, data2) => {
                    if (error) {
                      console.debug(error)
                      res.status(500).send({ error: 'Internal Server Error' }); return
                    }
                    if (data2 && data2.expiration_date <= data.expiration_date) {
                      updateVoucher(data.id, req.user)
                        .then(resolve => {
                          res.status(200).send({ msg: 'ok' })
                        })
                        .catch(reject => {
                          res.status(500).send({ error: 'Internal Server Error' })
                        })
                    } else {
                      res.status(403).send({ error: 'Impossible to use your voucher now ! The date of expiration of your current voucher is higher !' })
                    }
                  })
              }
            } else {
              res.status(403).send({ error: 'Voucher already used' })
            }
          } else {
            res.status(403).send({ error: 'Voucher not valid' })
          }
        }
      })
  })

function updateVoucher (id, email) {
  return new Promise((resolve, reject) => {
    global.db.run('UPDATE premium_vouchers SET date_of_use = ? WHERE id = ?',
      [Math.round(Date.now() / 1000), id], function (error) {
        if (error) {
          console.debug(error)
          reject(); return
        }
        global.db.run('UPDATE users SET id_premium_voucher = ? WHERE email = ?',
          [id, email], function (error) {
            if (error) {
              console.debug(error)
              reject(); return
            }
            resolve()
          })
      })
  })
}

module.exports = router
