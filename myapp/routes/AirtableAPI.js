var express= require('express');
var router = express.Router();
var AT=require('../../utils/Airtable')
router.get('/',async (req,res,next) =>{
    try {
        let records =await AT.csv_to_airtable('/GeneProject/csv/premature0-7.csv','apphn7fSPMk5mEcLz','r7')
        res.send(records)
    } catch(err){
        next(err);
    }
})

router.get('/AllRecords/',async (req,res,next) =>{
    try {
        let allRecords = await AT.getAirtableData('apphn7fSPMk5mEcLz','r7')
        res.send(allRecords)
    } catch(err){
        next(err);
    }
})

router.get('/getMatchRecords/',async (req,res,next) =>{
    try {
        let matchRecords = await AT.getMatchData(req.query['model_table'],req.query['patient_id'])
        res.send(matchRecords)
    } catch(err){
        next(err);
    }
})

module.exports=router;