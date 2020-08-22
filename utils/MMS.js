const database = require('./async-db.js')

async function getAllMembers(){
    var sqlcommand = "select * from `member`";
    const inserts=[];
    sqlcommand=database.format(sqlcommand,inserts);
    try{
        const results = await database.query(sqlcommand);
        return Promise.resolve(results)
    }
    catch(err){
        return Promise.reject(err)
    }
}
async function insertMember(username,password,email,phone){
    var sql = "INSERT into `member` (`username`, `password`, `email`, `phone`) VALUE (?,?,?,?)";
    const inserts = [username, password, email, phone];
    sqlcommand=database.format(sql,inserts);
    try{
        await database.query(sqlcommand);
        return Promise.resolve("success insert member")
    }
    catch(err){
        return Promise.reject(err)
    }
}
async function getMember(ID){
    var sqlCommand = "SELECT * FROM `member` WHERE `ID` = ?";
    const inserts = [ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        return Promise.resolve(results)
    }
    catch(err){
        return Promise.reject(err)
    }
}
async function updateMember(ID, username, password, email, phone){
    var sqlCommand = "UPDATE `member` SET `username` = ?,`password` = ?,`email` = ?,`phone` = ? WHERE `ID` = ?";
    const inserts = [ID, username, password, email, phone];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        return Promise.resolve("success update member")
    }
    catch(err){
        return Promise.reject(err)
    }
}
async function deleteMember(ID){
    var sqlCommand = "DELETE FROM `member` WHERE `ID`=?";
    const inserts = [ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        return Promise.resolve("success delete member");
    }
    catch(err){
        return Promise.reject(err);
    }
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

module.exports = { getAllMembers, insertMember,getMember,updateMember,deleteMember}