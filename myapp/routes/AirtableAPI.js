var express= require('express');
var router = express.Router();
var AT=require('../../utils/Airtable');
var jwt_decode = require('jwt-decode');

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

router.post('/',async (req,res,next) =>{
    try {
        if(checkPermission(req.headers['authorization'],3) == false){
            res.send('permission denied')
            return
        }
        let records =await AT.csv_to_airtable('/GeneProject/csv/patient.csv',req.body['base'],req.body['table'])
        res.send(records)
    } catch(err){
        next(err);
    }
})

router.get('/getMatchRecords/',async (req,res,next) =>{
    try {
        if(checkPermission(req.headers['authorization'],2) == false){
            res.send('permission denied')
            return
        }
        console.log(req)
        let matchRecords = await AT.getMatchData(req.body['compare_table'],req.body['patient_id'])
        res.send(matchRecords)
    } catch(err){
        next(err);
    }
})

module.exports=router;
//  heroku git:remote -a geneherokudb (connect heroku)
//  git push --force heroku HEAD:master
