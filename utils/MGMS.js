const database = require('./async-db.js')

async function getAllMatchGenes(patient_ID){
    var sqlCommand = "SELECT * FROM `match_mutation` WHERE  `match_mutation_ID` IN (SELECT `match_mutation_ID` FROM `match_chr_list` WHERE `patient_ID` = ?)";
    const inserts = [patient_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        console.log("success get person Match Genes");
        return Promise.resolve(results)
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function insertMatchGene(patient_ID,match_mutation_ID,chr_ID,position,atgc,m_atgc,exposed_disease,exposed_health,unexposed_disease,unexposed_health){     
    var sqlCommand = [];
    var sql1 = "INSERT into `match_mutation` (`match_mutation_ID`,`chr_ID`,`position`,`atgc`,`m_atgc`,`exposed_disease`,`exposed_health`,`unexposed_disease`,`unexposed_health`) VALUE (?,?,?,?,?,?,?,?,?)";
    const inserts1 = [match_mutation_ID, chr_ID,position,atgc,m_atgc,exposed_disease,exposed_health,unexposed_disease,unexposed_health];
    var sql2 = "INSERT into `match_chr_list` (`patient_ID`,`match_mutation_ID`) VALUE (?,?)";
    const inserts2 = [patient_ID, match_mutation_ID];
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


async function getMatchGene(match_mutation_ID){
    var sqlCommand = "SELECT `*` FROM `match_mutation` WHERE `match_mutation_ID` = ?";
    const inserts = [match_mutation_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        console.log("success get Match Gene");
        return Promise.resolve(results)
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function updateMatchGene(match_mutation_ID,chr_ID,position,atgc,m_atgc,exposed_disease,exposed_health,unexposed_disease,unexposed_health){
    var sqlCommand = "UPDATE `match_mutation` SET `chr_ID` = ?,`position` = ?,`atgc` = ?,`m_atgc` = ?,`exposed_disease` = ?,`exposed_health` = ?,`unexposed_disease` = ?,`unexposed_health` = ? WHERE `match_mutation_ID` = ?";
    const inserts = [chr_ID,position,atgc,m_atgc,exposed_disease,exposed_health,unexposed_disease,unexposed_health,match_mutation_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        return Promise.resolve("success update")
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function deleteMatchGene(match_mutation_ID){
    var sqlCommand = "DELETE FROM `match_mutation` WHERE `match_mutation_ID`=?";
    const inserts = [match_mutation_ID];
    sqlCommand = mysql.format(sqlCommand, inserts);
    try {
        await query(sqlCommand);
        console.log("success delete Match Gene");
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

module.exports = { getAllMatchGenes, insertMatchGene,getMatchGene,updateMatchGene,deleteMatchGene}