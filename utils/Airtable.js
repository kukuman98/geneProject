const AirtablePlus = require('airtable-plus');
const csv = require('./read-csv.js')

const att = new AirtablePlus({
    apiKey: 'keyt731Ji6vXlN4Xe',
    baseID: 'apphn7fSPMk5mEcLz',
    tableName: 'r7',
    camelCase: false,
    complex: false,
    transform: undefined // optional function to modify records on read
});



async function excel_to_airtable(CSVFile){
    data = await csv.readCVS('/GeneProject/csv/premature0-7.csv')
    for (i=0;i<data.length;i++){
        data[i]['B'] = parseInt(data[i]['B'])
        data[i]['A'] = parseInt(data[i]['A'])
        await att.create(data[i]);
    }
    return 200
}

async function getAirtableData(){
    try {
        var records= await att.read();
        return Promise.resolve(records)
    }
    catch(err){
        return Promise.reject(err)
    }
}

module.exports = {csv_to_airtable, getAirtableData}