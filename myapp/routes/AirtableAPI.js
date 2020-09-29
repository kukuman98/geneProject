var express= require('express');
var router = express.Router();
var AT=require('../../utils/Airtable')
router.get('/',async (req,res,next) =>{
    try {
        let records =await AT.csv_to_airtable()
        res.send(records)
    } catch(err){
        next(err);
    }
})

router.get('/AllRecords/',async (req,res,next) =>{
    try {
        let AllRecords = await AT.getAirtableData()
        res.send(AllRecords)
    } catch(err){
        next(err);
    }
})

module.exports=router;