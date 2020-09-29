var express= require('express');
var router = express.Router();
var AT=require('../../utils/Airtable')
router.get('/',function(req,res){
    let records = AT.excel_to_airtable()
    res.send(records)
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