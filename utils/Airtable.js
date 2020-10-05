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




async function csv_to_airtable(CSVFile,baseName,tableName){

    if(baseName == 'premature'){
        baseID = 'apphn7fSPMk5mEcLz'
    }
    else if(baseName == 'patient'){
        baseID = 'appKEDZLmLCDDRrW3'
    }
    else{
        return {code:404,error:'Not found the base in airtable'}
    }

    try{
        var att = set_base(baseID,tableName)
    }
    catch(err){
        return Promise.reject(err)
    }

    if (baseID=='apphn7fSPMk5mEcLz'){   //  premature mutation
        data = await csv.readCVS(CSVFile)
        for (i=0;i<data.length;i++){
            data[i]['B'] = parseInt(data[i]['B'])
            data[i]['A'] = parseInt(data[i]['A'])
            await att.create(data[i]);
        }
        return 200    
    }
    else if(baseID=='appKEDZLmLCDDRrW3'){   //  patient mutation
        data = await csv.readCVS(CSVFile)
        for (i=0;i<data.length;i++){
            await att.create(data[i]);
        }
        return 200
    }
}

function refactorData(records){
    var newRecords = []
    for(i in records){
        newRecords.push(records[i].fields)
    }
    return newRecords
}

function customMatchData(patients,models,match){
    if(match){
        
        patients['name'] = models['Gene.refGene']
        patients['type'] = models['Func.reference']
        patients['ratio'] = models['ratio']
        if(models['Func.referenc'] == "exonic"){
            patients['color'] = '#516E41'    
        }
        else if (models['Func.referenc'] == "ncRNA_exonic"){
            patients['color'] = '#B5495B' 
        }
        patients['shape'] = 'triangle'
        patients['status'] = 'match'    
    }
    else{
        patients['name'] = ''
        patients['type'] = ''
        patients['ratio'] = 0.0
        patients['color'] = '#F00'
        patients['shape'] = 'triangle'
        patients['status'] = 'mismatch'
    }
    return patients
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

function sumOfArray(arr){
    var sum = 0
    arr.forEach(function(element){
        sum+=element
    })
    return sum
}

function calculateTotalRatio(records){
    //  weight * log(relative_risk)
    var WLRR = []
    var all_weight = []
    var total_relative_risk = 0
    for(i in records){
        var weight = records[i].W
        var log_relative_risk = records[i].LRR
        WLRR.push(weight*log_relative_risk)
        all_weight.push(weight)
    }
    total_relative_risk = sumOfArray(WLRR)/sumOfArray(all_weight)
    total_relative_risk = Math.exp(total_relative_risk)
    return total_relative_risk
}

async function getMatchData(compareTableName,patientTableName){
    //  initial airtable connect setting
    const matt = set_base('apphn7fSPMk5mEcLz',compareTableName)
    const patt = set_base('appKEDZLmLCDDRrW3',patientTableName)
    try {
        //  initial read the airtable to store local variable
        var modelRecords = await matt.read({sort:[{field : 'chr',direction:'asc'}]})
        var patientRecords =await patt.read({sort:[{field : 'chr',direction:'asc'}]})

        //  refactor data structure
        modelRecords = refactorData(modelRecords)
        patientRecords = refactorData(patientRecords)

        //  initial the return value
        var allRecords = []
        var matchRecords = []

        //  compare match data by filter chr 
        for(i in patientRecords){
            var modelData = filterData(patientRecords[i].chr,modelRecords)
            var in_model = false
            for(j in modelData){
                if(compareData(patientRecords[i],modelData[j])){
                    record = customMatchData(patientRecords[i],modelData[j],true)
                    allRecords.push(record)
                    matchRecords.push(modelData[j])
                    in_model = true
                    break
                }
            }
            if(in_model == false){
                record = customMatchData(patientRecords[i],{},false)
                allRecords.push(record)
            }
        }

        //  pooled estimate algorithm relative risk by patient match gene
        var total_relative_risk = calculateTotalRatio(matchRecords)

        //  FE to get the total_relative_risk to use pop() function
        allRecords.push({total_relative_risk:total_relative_risk})
        return Promise.resolve(allRecords)
    }
    catch(err){
        return Promise.reject(err)
    }
}


module.exports = {csv_to_airtable, getMatchData}