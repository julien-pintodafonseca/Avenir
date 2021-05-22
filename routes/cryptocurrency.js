var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log("Crypto");
    res.status(200).send({ msg: 'Crypto' })
})

module.exports = router;