var express = require('express');
var router = express.Router();

var dms = require('../../utils/DMS');

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

router.get('/',async (req, res, next) => {
    try {
        if(checkPermission(req.headers['authorization'],2) == false){
            res.send('permission denied')
            return
        }
        let data = req.query;
        let historyFecth = await dms.getAllDiseases(data['patient_ID'])
        res.send(historyFecth);
    } catch (err) {
        next(err);
    }
});

router.post('/detail/',async (req,res,next) => {
    try {
        if(checkPermission(req.headers['authorization'],3) == false){
            res.send('permission denied')
            return
        }
        let data = req.query;
        let historyFecth = await dms.insertDisease(data['patient_ID'],data['medical_name'],data['hospital'],data['medical_date'],data['medical_instructions'],data['medical_description']);
        res.send(historyFecth);
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
        let history_ID = req.query['history_ID'];
        let historyFecth = await dms.deleteDisease(history_ID);
        res.send(historyFecth);
    } catch(err){
        next(err);
    }
});

router.put('/modify/',async (req,res,next) => {
    try {
        if(checkPermission(req.headers['authorization'],3) == false){
            res.send('permission denied')
            return
        }
        let data = req.query;
        let historyFecth = await dms.modify(data['history_ID'],data['field'],data['value']);
        res.send(historyFecth);
    } catch(err){
        next(err);
    }
});

module.exports = router;
//  heroku git:remote -a geneherokudb (connect heroku)
//  git push --force heroku HEAD:master
