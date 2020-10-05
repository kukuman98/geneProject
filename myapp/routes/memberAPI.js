var express = require('express');
var router = express.Router();
var jwt_decode = require('jwt-decode');
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
        let memberFecth = await mms.getAllMembers()
        res.send(memberFecth);    
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/detail/',async (req,res,next) => {
    try {
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
        let member_ID = req.query['ID'];
        let memberFecth = await mms.getMember(member_ID);
        res.send(memberFecth);    
    } catch(err){
        res.status(500).send(err);
    }
});

router.put('/detail/',async (req,res,next) => {
    try {
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
        let memberFecth = await mms.updateMember(data['ID'],data['username'],data['email'],data['phone'],data['level']);
        res.status(memberFecth['code']).send(memberFecth['message']);
    } catch(err){
        res.status(500).send(err);
    }
});

router.delete('/detail/',async (req,res,next) => {
    try {
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
        let member_ID = req.body['ID'];
        let memberFecth = await mms.deleteMember(member_ID);
        res.status(memberFecth['code']).send(memberFecth['message']);  
    } catch(err){
        res.status(500).send(err);
    }
});

router.put('/modify/', async (req,res,next)=>{
    try {
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
        let memberFecth = await mms.modify(data['ID'],data['field'],data['value']);
        res.status(memberFecth['code']).send(memberFecth['message']);   
    } catch(err){
        res.status(500).send(err);
    }
})
module.exports = router;
//  heroku git:remote -a geneherokudb (connect heroku)
//  git push --force heroku HEAD:master
