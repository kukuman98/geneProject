var XLSX= require('xlsx');
const AirtablePlus = require('airtable-plus');



const att = new AirtablePlus({
    apiKey: 'keyt731Ji6vXlN4Xe',
    baseID: 'apphn7fSPMk5mEcLz',
    tableName: 'r7',
    camelCase: false,
    complex: false,
    transform: undefined // optional function to modify records on read
});



function excel_to_airtable(){
    const airtable = new Airtable({ apiKey:'keyt731Ji6vXlN4Xe', base:'apphn7fSPMk5mEcLz', table:'r7', view:'Grid View' })
    var XLSX = require('xlsx')
    var workbook = XLSX.readFile('ratiofilter.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
    for (i=0;i<data.length;i++){
        att.create(data[i]);
    }
}

function getAirtableData(){
    var records=await read();
}

module.exports = { excel_to_airtable,getAirtableData}