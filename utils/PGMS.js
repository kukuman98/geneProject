const database = require('./async-db.js')

async function getAllPatientGenes(patient_ID){
    var sqlCommand = "SELECT * FROM `patient_mutation` WHERE  `patient_mutation_ID` IN (SELECT `patient_mutation_ID` FROM `patient_chr_list` WHERE `patient_ID` = ?)";
    const inserts = [patient_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        console.log("success get person Genes");
        return Promise.resolve(results)
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function insertPatientGene(patient_ID,history_ID,disease_name){     
    var sqlCommand = [];
    var sql1 = "INSERT into `medical_history` (`history_ID`,`disease_name`) VALUE (?,?)";
    const inserts1 = [history_ID, disease_name];
    var sql2 = "INSERT into `medical_history_list` (`patient_ID`,`history_ID`) VALUE (?,?)";
    const inserts2 = [patient_ID, history_ID];
    sql1 = database.format(sql1,inserts1);
    sqlCommand.push(sql1);
    sql2 = database.format(sql2,inserts2);
    sqlCommand.push(sql2);
    try {
        await database.transaction(sqlCommand);
        return Promise.resolve("success insert")
    }
    catch(err){
        return Promise.reject(err)
    }
}


async function getPatientGene(history_ID){
    var sqlCommand = "SELECT `*` FROM `medical_history` WHERE `history_ID` = ?";
    const inserts = [history_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        console.log("success get disease");
        return Promise.resolve(results)
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function updatePatientGene(history_ID, disease_name){
    var sqlCommand = "UPDATE `medical_history` SET `disease_name` = ? WHERE `history_ID` = ?";
    const inserts = [disease_name,history_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        return Promise.resolve("success update")
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function deletePatientGene(history_ID){
    var sqlCommand = "DELETE FROM `medical_history` WHERE `history_ID`=?";
    const inserts = [history_ID];
    sqlCommand = mysql.format(sqlCommand, inserts);
    try {
        await query(sqlCommand);
        console.log("success delete disease");
        return Promise.resolve(results);
    }
    catch(err){
        return Promise.reject(err);
    }
}

function compareObj(obj1,obj2){
    var i=0;
    while(obj2[i]){
        if(obj1 === obj2[i].ID){
            return true;
        }
        i++; 
    }
    return false;
}


function getRealTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

//ex:
//commentGame(2,1,"good good lah",5);

module.exports = { getAllPatientGenes, insertPatientGene,getPatientGene,updatePatientGene,deletePatientGene}