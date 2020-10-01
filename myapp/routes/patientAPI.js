var express = require('express');
var router = express.Router();

var pms = require('../../utils/PMS');

router.post('/',async (req,res,next) => {
    try {
        let data = req.query
        let fetchPms = await pms.insertPatient(data['first_name'],data['last_name'],data['email'],data['birth'],data['gender'])
        res.send(fetchPms);
        
    } catch(err){
        next(err);
    }

});

router.get('/', async (req, res, next) =>{
    try { 
        let patienFecth = await pms.getAllPatients();
        res.send(patienFecth);
    } catch (err) {
        next(err);
    }
});

router.get('/detail/',async (req,res,next) => {
    try {
        let patient_ID = req.query['patient_ID'];
        let patientFecth = await pms.getPatient(patient_ID);
        res.send(patientFecth);
    } catch(err){
        next(err);
    }
});

router.put('/detail/',async (req,res,next) => {
    try {
        let data = req.query;
        let fetchPms = await pms.updatePatient(data['patient_ID'],data['first_name'],data['last_name'],data['email'],data['birth'],data['gender']);
        res.send(fetchPms);
    } catch(err){
        next(err);
    }
});

router.delete('/detail/',async (req,res,next) => {
    try {
        let patient_ID = req.query['patient_ID'];
        let fetchPms = await pms.deletePatient(patient_ID);
        res.send(fetchPms);
    } catch(err){
        next(err);
    }
});
module.exports = router;
//  heroku git:remote -a geneherokudb (connect heroku)
//  git push --force heroku HEAD:master
