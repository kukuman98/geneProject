var express = require('express');
var router = express.Router();

var pms = require('../../utils/PMS');

router.get('/', function (req, res, next) {
    // const data = req.body
    // console.log(data.patient_ID)
    // pms.getAllPatients()
    //     .then(function (result) {
    //         console.log(result)
    //         var data = []
    //         result.forEach(function (element) {
    //             data.push({
    //                 patient_ID: element.patient_ID,
    //                 first_name: element.first_name,
    //                 last_name: element.last_name,
    //                 birth: element.birth,
    //                 gender: element.gender,
    //             });
    //         });
    //         res.json(data);
    //     })
    //     .catch(function (err) {
        
    //         console.log(err)
    //     })
    var data = [];
    data.push(pms.getAllPatients());
    res.render('index', { title: 'testAPI',data : JSON.stringify(data) });
});

module.exports = router;
//heroku git:remote -a geneherokudb (connect heroku)
// git push --force heroku HEAD:master

//http://localhost:3000/testAPI/?patient_ID=1#/