var express= require('express');
var router = express.Router();
var AT=require('../../utils/Airtable');
var mms = require('../../utils/MMS');
var jwt_decode = require('jwt-decode');

async function checkPermission(token,level){
    let permission = jwt_decode(token)
    var member = await mms.getMember(permission['uid'])
    if(member[0]['ID'] != permission['uid']) return false
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

router.post('/',async (req,res,next) =>{
    try {
        console.log(req.body.file)
        console.log(req.files)
        if(await checkPermission(req.headers['authorization'],3) == false){
            res.send('permission denied')
            return
        }
        console.log(req.query)
        if(!req.body.file) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let avatar = req.body.file;
            avatar.mv('./csv/' + avatar.name);
            let records =await AT.csv_to_airtable('./csv/'+avatar.name.toString(),req.query['base'],req.query['table'])
            res.status(records).send({
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

router.get('/getMatchRecords/',async (req,res,next) =>{
    try {
        if(await checkPermission(req.headers['authorization'],2) == false){
            res.send('permission denied')
            return
        }
        let matchRecords = await AT.getMatchData(req.query['compare_table'],req.query['patient_ID'])
        res.send(matchRecords)
    } catch(err){
        next(err);
    }
})

module.exports=router;
//  heroku git:remote -a geneherokudb (connect heroku)
//  git push --force heroku HEAD:master
