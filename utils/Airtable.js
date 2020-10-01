const AirtablePlus = require('airtable-plus');
const csv = require('./read-csv.js')
// baseID = 'apphn7fSPMk5mEcLz'

function set_base(baseID,tableName){
    const att = new AirtablePlus({
        apiKey: 'keyt731Ji6vXlN4Xe',
        baseID: baseID,
        tableName: tableName,
        camelCase: false,
        complex: false,
        transform: undefined // optional function to modify records on read
    });    
    return att
}




async function csv_to_airtable(CSVFile,baseID,tableName){
    const att = set_base(baseID,tableName)
    if (baseID=='apphn7fSPMk5mEcLz'){   //premature mutation
        data = await csv.readCVS(CSVFile)
        for (i=0;i<data.length;i++){
            data[i]['B'] = parseInt(data[i]['B'])
            data[i]['A'] = parseInt(data[i]['A'])
            await att.create(data[i]);
        }
        return 200    
    }
    else if(baseID=='appKEDZLmLCDDRrW3'){   //patient mutation
        return 200
    }
    else if(baseID=='appRal8WYI88Zc6Zh'){   //match mutation
        return 200
    }
    else{
        setMatchGene()
        return 200
    }
}

async function setMatchGene(baseID,tableName){
    // console.log(base.name)
}

async function getAirtableData(baseID,tableName){
    const att = set_base(baseID,tableName)
    try {
        // filterByFormula:'chr = 1'
        var records=await att.read({sort:[{field : 'chr',direction:'asc'}]})
        records = refactorData(records)
        return Promise.resolve(records)
    }
    catch(err){
        return Promise.reject(err)
    }
}

function refactorData(records){
    var newRecords = []
    for(i in records){
        newRecords.push(records[i].fields)
    }
    return newRecords
}

function filterData(patietnCHR,records){
    var newRecords = records.filter(record => record.chr == patietnCHR)
    return newRecords
}

function compareData(patient,model){
    if(patient.position != model.position) return false
    if(patient.Ref != model.Ref) return false
    if(patient.Alt != model.Alt) return false
    return true
}

async function getMatchData(modelTableName,patientTableName){
    const matt = set_base('apphn7fSPMk5mEcLz',modelTableName)
    const patt = set_base('appKEDZLmLCDDRrW3',patientTableName)
    try {

        var modelRecords = await matt.read({sort:[{field : 'chr',direction:'asc'}]})
        var patientRecords =await patt.read({sort:[{field : 'chr',direction:'asc'}]})
        //  refactor data structure
        modelRecords = refactorData(modelRecords)
        patientRecords = refactorData(patientRecords)

        var matchRecords = []
        //  compare match data by filter chr
        for(i in patientRecords){
            var modelData = filterData(patientRecords[i].chr,modelRecords)
            for(j in modelData){
                if(compareData(patientRecords[i],modelData[j])){
                    matchRecords.push(modelData[j])
                }
            }
        }
        return Promise.resolve(matchRecords)
    }
    catch(err){
        return Promise.reject(err)
    }
}


module.exports = {csv_to_airtable, getAirtableData, getMatchData}