var express = require('express');
var router = express.Router();
var gms = require('../../utils/DMS');

router.post('/', function (req, res, next) {
    const data = req.body
    console.log(data.type,data.state)
    gms.gamelist(data.type,data.state)
        .then(function (result) {
            console.log(result)
            var data = []
            result.forEach(function (element) {
                data.push({
                    history_ID: element.history_ID,
                    medical_name: element.medical_name,
                });
            });
            res.json(data);
        })
        .catch(function (err) {
            console.log(err)
        })

});

module.exports = router;

// git push --force heroku HEAD:master