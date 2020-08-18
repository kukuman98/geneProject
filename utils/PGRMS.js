const database = require('./async-db.js')

async function getAllPrematureGenes(){
    var sqlCommand = "SELECT * FROM `premature_mutation`";
    sqlCommand = database.format(sqlCommand);
    try {
        const results = await database.query(sqlCommand);
        return Promise.resolve(results)
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function insertPrematureGene(chr_ID,position,atgc,m_atgc,exposed_disease,exposed_health,unexposed_disease,unexposed_health){     
    var sqlCommand = "INSERT into `premature_mutation` (`chr_ID`,`position`,`atgc`,`m_atgc`,`exposed_disease`,`exposed_health`,`unexposed_disease`,`unexposed_health`) VALUE (?,?,?,?,?,?,?,?)";
    const inserts = [chr_ID,position,atgc,m_atgc,exposed_disease,exposed_health,unexposed_disease,unexposed_health];
    sqlCommand = database.format(sqlCommand,inserts);
    try {
        await database.query(sqlCommand);
        return Promise.resolve("success insert")
    }
    catch(err){
        return Promise.reject(err)
    }
}


async function getPrematureGene(premature_mutation_ID){
    var sqlCommand = "SELECT * FROM `premature_mutation` WHERE `premature_mutation_ID` = ?";
    const inserts = [premature_mutation_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        return Promise.resolve(results)
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function updatePrematureGene(premature_mutation_ID,chr_ID,position,atgc,m_atgc,exposed_disease,exposed_health,unexposed_disease,unexposed_health){
    var sqlCommand = "UPDATE `premature_mutation` SET `chr_ID` = ?,`position` = ?,`atgc` = ?,`m_atgc` = ?,`exposed_disease` = ?,`exposed_health` = ?,`unexposed_disease` = ?,`unexposed_health` = ? WHERE `premature_mutation_ID` = ?";
    const inserts = [chr_ID,position,atgc,m_atgc,exposed_disease,exposed_health,unexposed_disease,unexposed_health,premature_mutation_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        return Promise.resolve("success update")
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function deletePrematureGene(premature_mutation_ID){
    var sqlCommand = "DELETE FROM `premature_mutation` WHERE `premature_mutation_ID`=?";
    const inserts = [premature_mutation_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        return Promise.resolve("success delete Premature Gene");
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

module.exports = { getAllPrematureGenes, insertPrematureGene,getPrematureGene,updatePrematureGene,deletePrematureGene}