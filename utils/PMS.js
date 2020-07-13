const database = require('./async-db.js')

async function getAllPatients(){
    var sqlCommand = "SELECT * FROM `patient`";
    const inserts = [];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        console.log("success get all patients");
        return Promise.resolve(results)
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function insertPatient(first_name, last_name, birth, gender){     
    var sql = "INSERT into `patient` (`first_name`,`last_name`,`birth`,`gender`) VALUE (?,?,?,?)";
    const inserts = [first_name, last_name, birth, gender];
    sqlCommand = database.format(sql,inserts);
    try {
        await database.query(sqlCommand);
        return Promise.resolve("success insert patient")
    }
    catch(err){
        return Promise.reject(err)
    }
}


async function getPatient(patient_ID){
    var sqlCommand = "SELECT `*` FROM `patient` WHERE `patient_ID` = ?";
    const inserts = [patient_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        console.log("success get patient");
        return Promise.resolve(results)
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function updatePatient(patient_ID, first_name, last_name, birth, gender){
    var sqlCommand = "UPDATE `patient` SET `first_name` = ?,`last_name` = ?,`birth` = ?,`gender` = ? WHERE `patient_ID` = ?";
    const inserts = [first_name, last_name, birth, gender, patient_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        return Promise.resolve("success update patient")
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function deletePatient(patient_ID){
    var sqlCommand = "DELETE FROM `patient` WHERE `patient_ID`=?";
    const inserts = [patient_ID];
    sqlCommand = mysql.format(sqlCommand, inserts);
    try {
        await query(sqlCommand);
        console.log("success delete patient");
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

module.exports = { getAllPatients, insertPatient,getPatient,updatePatient,deletePatient}