var express = require('express');
var router = express.Router();
const tokenService = require('../services/token')

router.post('/login', function(req, res) {
    console.debug('Connection sur /login')
    console.debug(`${req.body.email} avec le mot de passe ${req.body.password}`)
    global.db.get('select email from users where email = ? and password = ?', [req.body.email, req.body.password],
      (error, data) => {
        if (error) {
          console.debug('Erreur', error)
          res.status(500).send('Erreur login'); return
        }
        if (data && data.email === req.body.email) {
          const token = tokenService.getToken(data.email, data.id, 'api')
          console.debug(`Acceptée avec le token ${token}`)
          res.status(202).send({ token }); return
        }
        res.status(403).send({ msg: 'Connexion refusé' })
      }
    )
});

function validateEmail(errors, email)
{
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const email_valid =  re.test(email);
    if(email_valid)
    {
        global.db.get('SELECT email FROM users where email = ?', [email],
            (error, data) => {
            if (error) {
                console.debug('Erreur: ', error)
                errors.push("Un problème est survenu")
            }
            if (data && data.email === email) {
                console.debug("Email existe déjà")
                errors.push("Email existe déjà")
            }
            console.debug("Email valide");
            return errors;
        })
    }
    else
    {
        return errors.push("Email invalide")
    }
}


function validatePassword(errors, password, password2)
{
    if(password !== password2)
    {
        errors.push("Les mots de passes ne correspondent pas")
    }
    // minimum 8 caractères dont une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const password_valid = re.test(password)
    if(!password_valid)
    {
        errors.push("Mot de passe invalide: Il faut au minimum 8 caractères dont une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial")
    }
}

router.post('/registration', function(req, res) {
    console.log("/registration");
    const password = req.body.password;
    const password2 = req.body.password2;
    const email = req.body.email;
    let errors = [];

    validateEmail(errors, email);
    validatePassword(errors, password, password2);


    if(errors.length !== 0)
    {
        console.log(errors);
        res.status(500).send({ errors })
    }
    else
    {
        global.db.run("INSERT INTO users(email, password, is_admin, id_premium_voucher) values(?, ?, 0, NULL)", [email, password])
        res.status(201).send({ msg: 'ok' })
    }
});

module.exports = router;