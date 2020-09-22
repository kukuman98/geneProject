var express= require('express');
var router = express.Router();
var AT=require('../../utils/Airtable')
router.get('/',function(req,res){
    let records = AT.excel_to_airtable
    res.send(records)
})

router.get('/AllRecords/',function(req,res){
    let AllRecords=AT.getAirtableData
    res.send(AllRecords)
})

module.exports=router;