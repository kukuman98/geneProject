var express = require('express');
var router = express.Router();

var pms = require('../../utils/PMS');

router.post('/',async (req,res,next) => {
    try {
        let data = req.query
        pms.insertPatient(data['first_name'],data['last_name'],data['birth'],data['gender'])
        res.send('success insert patient');
        
    } catch(err){
        next(err);
    }

});

router.get('/', async (req, res, next) =>{
    try {
    //listing messages in users mailbox 
        let patienFecth = await pms.getAllPatients();
        res.send(patienFecth);
        // res.render('index',{title: 'testAPI',data : JSON.stringify(patienFecth)});
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
        await pms.updatePatient(data['patient_ID'],data['first_name'],data['last_name'],data['birth'],data['gender']);
        res.send('success update patient data');
    } catch(err){
        next(err);
    }
});

router.delete('/detail/',async (req,res,next) => {
    try {
        let patient_ID = req.query['patient_ID'];
        await pms.deletePatient(patient_ID);
        res.send('succes delete patient');
    } catch(err){
        next(err);
    }
});
module.exports = router;
//heroku git:remote -a geneherokudb (connect heroku)
// git push --force heroku HEAD:master

//http://localhost:3000/testAPI/?patient_ID=1#/