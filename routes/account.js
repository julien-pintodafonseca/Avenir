var express = require('express');
var router = express.Router();
const tokenService = require('../services/token')

router.post('/login', function(req, res) {
    console.debug('Connection sur /login')
    console.debug(`${req.body.email} avec le mot de passe ${req.body.password}`)
    global.db.get('select email from users where email = ? and password = ?', [req.body.email, req.body.password],
      (error, data) => {
        if (error) {
          console.debug(error)
          res.status(500).send({ error: 'Internal Server Error' }); return
        }
        if (data && data.email === req.body.email) {
          const token = tokenService.getToken(data.email, data.id, 'api')
          console.debug(`Acceptée avec le token ${token}`)
          res.status(202).send({ token }); return
        }
        res.status(403).send({ error: 'Connection refused' })
      }
    )
});

function validateEmail(errors, email, callback)
{
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const email_valid =  re.test(email);
    if(email_valid)
    {
        global.db.get('SELECT email FROM users where email = ?', [email],
            (error, data) => {
            if (error) {
                console.debug(error)
                errors.push('Internal Server Error')
            }
            if (data && data.email === email) {
                console.debug("Email already used")
                errors.push('Email already used')
            }
            return callback(errors)
        })
    }
    else
    {
        console.debug("Email invalid");
        errors.push('Email invalid')
    }
    return callback(errors)
}


function validatePassword(errors, password, password2)
{
    if(password !== password2)
    {
        console.debug("Passwords do not match");
        errors.push('Passwords do not match')
    }
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const password_valid = re.test(password)
    if(!password_valid)
    {
        console.debug("Invalid password");
        errors.push('Invalid password: min 8 characters')
    }
}

router.post('/registration', function(req, res) {
    console.debug("/registration");
    const password = req.body.password;
    const password2 = req.body.password2;
    const email = req.body.email;
    let errors = []

    validatePassword(errors, password, password2);
    validateEmail(errors, email, function(errors) {
        if (errors.length !== 0)
        {
            res.status(403).send({ errors })
        }
        else
        {
            global.db.run("INSERT INTO users(email, password, is_admin, id_premium_voucher) values(?, ?, 0, NULL)",
            [email, password], function (error) {
                if (error) {
                    console.debug(error); return
                }
                global.db.run("INSERT INTO wallets(id_user) values(?)", [this.lastID], function (error) {
                    if (error) {
                        console.debug(error); return
                    }
                    res.status(201).send({ msg: 'ok' })
                })
            })
        }
    })
});

module.exports = router;