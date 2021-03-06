var express = require('express');
var router = express.Router();
var jwt_decode = require('jwt-decode');
var dms = require('../../utils/DMS');
var mms = require('../../utils/MMS');

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

router.get('/',async (req, res, next) => {
    try {
        var token  = req.headers['authorization']
        if(token == undefined){
            res.status(400).send('Not found Authorization token in Headers!!')
            return 
        }
        let permission = jwt_decode(token)
        var member = await mms.getMember(permission['uid'])
        if(member[0]['ID'] != permission['uid']){
            res.status(401).send('Not found User in DataBase')
            return
        } 
        if(await checkPermission(permission,2) == false){
            res.status(403).send('Forbidden : permission denied')
            return
        }

        let data = req.query;
        let historyFecth = await dms.getAllDiseases(data['patient_ID'])
        res.send(historyFecth);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/detail/',async (req,res,next) => {
    try {
        var token  = req.headers['authorization']
        if(token == undefined){
            res.status(400).send('Not found Authorization token in Headers!!')
            return 
        }
        let permission = jwt_decode(token)
        var member = await mms.getMember(permission['uid'])
        if(member[0]['ID'] != permission['uid']){
            res.status(401).send('Not found User in DataBase')
            return
        } 
        if(await checkPermission(permission,3) == false){
            res.status(403).send('Forbidden : permission denied')
            return
        }
        let data = req.body;
        let historyFecth = await dms.insertDisease(data['patient_ID'],data['medical_name'],data['hospital'],data['medical_date'],data['medical_instructions'],data['medical_description']);
        res.status(historyFecth['code']).send(historyFecth['message']);
    } catch(err){
        res.status(500).send(err);
    }
});

router.put('/detail/',async (req,res,next) => {
    try {
        var token  = req.headers['authorization']
        if(token == undefined){
            res.status(400).send('Not found Authorization token in Headers!!')
            return 
        }
        let permission = jwt_decode(token)
        var member = await mms.getMember(permission['uid'])
        if(member[0]['ID'] != permission['uid']){
            res.status(401).send('Not found User in DataBase')
            return
        } 
        if(await checkPermission(permission,3) == false){
            res.status(403).send('Forbidden : permission denied')
            return
        }
        let data = req.body;
        let historyFecth = await dms.updateDisease(data['history_ID'],data['medical_name'],data['hospital'],data['medical_date'],data['medical_instructions'],data['medical_description']);
        res.status(historyFecth['code']).send(historyFecth['message']);
    } catch(err){
        res.status(500).send(err);
    }
});

router.delete('/detail/',async (req,res,next) => {
    try {
        var token  = req.headers['authorization']
        if(token == undefined){
            res.status(400).send('Not found Authorization token in Headers!!')
            return 
        }
        let permission = jwt_decode(token)
        var member = await mms.getMember(permission['uid'])
        if(member[0]['ID'] != permission['uid']){
            res.status(401).send('Not found User in DataBase')
            return
        } 
        if(await checkPermission(permission,3) == false){
            res.status(403).send('Forbidden : permission denied')
            return
        }
        let history_ID = req.body['history_ID'];
        let historyFecth = await dms.deleteDisease(history_ID);
        res.status(historyFecth['code']).send(historyFecth['message']);
    } catch(err){
        res.status(500).send(err);
    }
});

router.put('/modify/',async (req,res,next) => {
    try {
        var token  = req.headers['authorization']
        if(token == undefined){
            res.status(400).send('Not found Authorization token in Headers!!')
            return 
        }
        let permission = jwt_decode(token)
        var member = await mms.getMember(permission['uid'])
        if(member[0]['ID'] != permission['uid']){
            res.status(401).send('Not found User in DataBase')
            return
        } 
        if(await checkPermission(permission,3) == false){
            res.status(403).send('Forbidden : permission denied')
            return
        }
        let data = req.body;
        let historyFecth = await dms.modify(data['history_ID'],data['field'],data['value']);
        res.status(historyFecth['code']).send(historyFecth['message']);
    } catch(err){
        res.status(500).send(err);
    }
});

module.exports = router;
//  heroku git:remote -a geneherokudb (connect heroku)
//  git push --force heroku HEAD:master
