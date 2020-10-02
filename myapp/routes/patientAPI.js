var express = require('express');
var router = express.Router();
var jwt_decode = require('jwt-decode');
var pms = require('../../utils/PMS');

function checkPermission(token,level){
    let permission = jwt_decode(token)
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
        if(checkPermission(req.headers['authorization'],3) == false){
            res.send('permission denied')
            return
        }
        let data = req.query
        let fetchPms = await pms.insertPatient(data['first_name'],data['last_name'],data['email'],data['birth'],data['gender'])
        res.send(fetchPms);    
    } catch(err){
        next(err);
    }

});

router.get('/', async (req, res, next) =>{
    try { 
        if(checkPermission(req.headers['authorization'],2) == false){
            res.send('permission denied')
            return
        }
        let patienFecth = await pms.getAllPatients();
        res.send(patienFecth);    
    } catch (err) {
        next(err);
    }
});

router.put('/detail/',async (req,res,next) => {
    try {
        if(checkPermission(req.headers['authorization'],3) == false){
            res.send('permission denied')
            return
        }
        let data = req.query;
        let fetchPms = await pms.updatePatient(data['patient_ID'],data['first_name'],data['last_name'],data['email'],data['birth'],data['gender']);
        res.send(fetchPms);    
    } catch(err){
        next(err);
    }
});

router.delete('/detail/',async (req,res,next) => {
    try {
        if(checkPermission(req.headers['authorization'],3) == false){
            res.send('permission denied')
            return
        }
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
