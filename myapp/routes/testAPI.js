var express = require('express');
var router = express.Router();
var dms = require('../../utils/DMS');

router.post('/', function (req, res, next) {
    const data = req.body
    console.log(data.patient_ID)
    dms.getAllDisease(data.patient_ID)
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
//heroku git:remote -a geneherokudb (connect heroku)
// git push --force heroku HEAD:master

//http://localhost:3000/testAPI/?patient_ID=1#/