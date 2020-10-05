var express = require('express');
var router = express.Router();
var jwt_decode = require('jwt-decode');
var pms = require('../../utils/PMS');
var mms = require('../../utils/MMS')

async function checkPermission(permission,level){
    if(level==3 && permission['admin'] == true){
        return true
    }
    else if(level==2 && (permission['staff'] == true || permission['admin'] == true)){
        return true
    }
    else{
        return false
    }
}

router.post('/',async (req,res,next) => {
    try {
        var token  = req.headers['authorization']
        if(token == undefined){
            res.status(400).send('Not found Authorization in Headers!!')
            return 
        }
        let permission = jwt_decode(token)
        var member = await mms.getMember(permission['uid'])
        if(member[0]['ID'] != permission['uid']) return false
        if(await checkPermission(permission,3) == false){
            res.send('permission denied')
            return
        }
        let data = req.body
        let fetchPms = await pms.insertPatient(data['first_name'],data['last_name'],data['email'],data['birth'],data['gender'],data['allergen'])
        res.send(fetchPms);    
    } catch(err){
        res.status(500).send(err);
    }

});

router.get('/', async (req, res, next) =>{
    try { 
        if(await checkPermission(req.headers['authorization'],2) == false){
            res.send('permission denied')
            return
        }
        let patienFecth = await pms.getAllPatients();
        res.send(patienFecth);    
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/detail/', async (req, res, next) =>{
    try { 
        if(await checkPermission(req.headers['authorization'],3) == false){
            res.send('permission denied')
            return
        }
        let data = req.query;
        let patienFecth = await pms.getPatient(data['patient_ID']);
        res.send(patienFecth);    
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/detail/',async (req,res,next) => {
    try {
        if(await checkPermission(req.headers['authorization'],3) == false){
            res.send('permission denied')
            return
        }
        let data = req.body;
        let fetchPms = await pms.updatePatient(data['patient_ID'],data['first_name'],data['last_name'],data['email'],data['birth'],data['gender'],data['allergen']);
        res.send(fetchPms);    
    } catch(err){
        res.status(500).send(err);
    }
});

router.delete('/detail/',async (req,res,next) => {
    try {
        if(await checkPermission(req.headers['authorization'],3) == false){
            res.send('permission denied')
            return
        }
        let patient_ID = req.body['patient_ID'];
        let fetchPms = await pms.deletePatient(patient_ID);
        res.send(fetchPms);    
    } catch(err){
        res.status(500).send(err);
    }
});
module.exports = router;
//  heroku git:remote -a geneherokudb (connect heroku)
//  git push --force heroku HEAD:master
