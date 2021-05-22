var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log("Wallet");
    res.status(200).send({ msg: 'Wallet' })
})

module.exports = router;