var express= require('express');
var router = express.Router();
var AT=require('../../utils/Airtable');
var mms = require('../../utils/MMS');
var jwt_decode = require('jwt-decode');

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

router.post('/uploads/',async (req,res,next) =>{
    try {
        console.log(typeof(req.files.file))
        console.log(req.files.file)
        console.log(typeof(req.files))
        console.log(req.body)
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
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let avatar = req.files.file;
            avatar.mv('./tmp/' + avatar.name);
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
        
    } catch(err){
        res.status(500).send(err);
    }
})

router.post('/',async (req,res,next) =>{
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
        
        let records =await AT.csv_to_airtable('./tmp/' + req.body['filename'],req.body['base'],req.body['table'])
        res.status(records['code']).send(records['message']);
    } catch(err){
        res.status(500).send(err);
    }
})

router.get('/getMatchRecords/',async (req,res,next) =>{
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
        if(await checkPermission(permission,2) == false){
            res.status(403).send('Forbidden : permission denied')
            return
        }
        let matchRecords = await AT.getMatchData(req.query['compare_table'],req.query['patient_ID'])
        res.send(matchRecords)
    } catch(err){
        res.status(500).send(err);
    }
})

module.exports=router;
//  heroku git:remote -a geneherokudb (connect heroku)
//  git push --force heroku HEAD:master
