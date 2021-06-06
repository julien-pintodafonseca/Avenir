/* eslint-disable prefer-regex-literals, no-useless-escape */

const express = require('express')
const router = express.Router()
const tokenService = require('../services/token')
const bcrypt = require('bcrypt')

const SALT = 10

router.post('/login', function (req, res) {
  global.db.get('select id, email, is_admin, id_premium_voucher, password from users where email = ?', [req.body.email],
    async (error, data) => {
      if (error) {
        console.debug(error)
        res.status(500).send({ error: 'Internal Server Error' }); return
      }
      if (data) {
        const result = await bcrypt.compare(req.body.password, data.password)
        if (result === true) {
          const token = tokenService.getToken(data.email, data.id, 'api', data.is_admin, data.id_premium_voucher)
          console.debug(`Acceptée avec le token ${token}`)
          res.status(202).send({ token, is_admin: data.is_admin, is_premium: data.id_premium_voucher }); return
        }
      }
      res.status(403).send({ error: 'Connection refused' })
    }
  )
})

async function validateEmail (errors, email) {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const email_valid = re.test(email)
  return new Promise((resolve, reject) => {
    if (!email_valid) {
      console.debug('Email invalid')
      errors.push('Email invalid')
      resolve(errors)
    }
    global.db.get('SELECT email FROM users where email = ?', [email],
      (error, data) => {
        if (error) {
          console.debug(error)
          errors.push('Internal Server Error')
        }
        if (data && data.email === email) {
          console.debug('Email already used')
          errors.push('Email already used')
        }
        resolve(errors)
      })
  })
}

function validatePassword (errors, password, password2) {
  if (password !== password2) {
    console.debug('Passwords do not match')
    errors.push('Passwords do not match')
  }
  const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
  const password_valid = re.test(password)
  if (!password_valid) {
    console.debug('Invalid password')
    errors.push('Invalid password: Password must contain at least 8 characters, 1 special character, 1 number, one lowercase and 1 one uppercase alphabetical')
  }
}

router.post('/registration', function (req, res) {
  console.debug('/registration')
  const password = req.body.password
  const password2 = req.body.password2
  const email = req.body.email
  const errors = []

  validatePassword(errors, password, password2)
  validateEmail(errors, email)
    .then(errors => {
      if (errors.length !== 0) {
        res.status(400).send({ errors })
      } else {
        bcrypt.hash(password, SALT, (err, hash) => {
          global.db.run('INSERT INTO users(email, password, is_admin, id_premium_voucher) values(?, ?, 0, NULL)',
            [email, hash], function (error) {
              if (error) {
                console.debug(error)
                res.status(500).send('Internal Server Error'); return
              }
              res.status(201).send({ msg: 'Account created' })
            })
          if (err) {
            console.debug(err)
            res.status(500).send('Internal Server Error')
          }
        })
      }
    })
})

module.exports = {
  router,
  validatePassword,
  SALT
}
