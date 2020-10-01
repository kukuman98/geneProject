var express= require('express');
var router = express.Router();
var AT=require('../../utils/Airtable')
router.post('/',async (req,res,next) =>{
    try {
        let records =await AT.csv_to_airtable('/GeneProject/csv/patient.csv',req.query['base'],req.query['table'])
        res.send(records)
    } catch(err){
        next(err);
    }
})

router.get('/getMatchRecords/',async (req,res,next) =>{
    try {
        let matchRecords = await AT.getMatchData(req.query['compare_table'],req.query['patient_id'])
        res.send(matchRecords)
    } catch(err){
        next(err);
    }
})

module.exports=router;