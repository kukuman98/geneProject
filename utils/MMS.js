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
async function updateMember(ID, username, password, email, phone, level){
    var sqlCommand = "UPDATE `member` SET `username` = ?,`password` = ?,`email` = ?,`phone` = ?,`level` = ? WHERE `ID` = ?";
    const inserts = [username, password, email, phone, level,ID];
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




async function register(username,password,email,phone,level){

    try {
        let sql = "INSERT into `member` (`username`, `password`, `email`, `phone`,`level`) VALUE (?,?,?,?,?)";
        const inserts = [username,password,email,phone,level];
        sqlCommand = database.format(sql, inserts);
        await database.query(sqlCommand);
        return Promise.resolve("success register member");
    }
    catch (err) {
        return Promise.reject(err);
    }
}


async function modify (id, field, value){
    try {
        let sql = "UPDATE `member` SET ??=? WHERE `ID`=?"
        const inserts = [field, value, id]
        sql = database.format(sql, inserts)
        results = await database.query(sql)
        return Promise.resolve('success modify field')
    }
    catch (err) {
        return Promise.reject(err)
    }

}

async function login(email, password){
    try {
        let sql = "SELECT `password`,`ID`,`level` FROM `member` WHERE `email`=?"
        const inserts = [email]
        sql = database.format(sql, inserts)
        console.log(sql)
        results = await database.query(sql)
        console.log(results[0]['password'],password)
        if (results[0]['password'] == password) {
            return Promise.resolve({"ID":results[0]['ID'],"level":results[0]['level']})
        }
        else {
            throw 'password is not correct or account no exist'
        }

    }
    catch (err) {
        return Promise.reject(err)
    }

}
//ex:
//commentGame(2,1,"good good lah",5);

module.exports = { register,modify,login,getAllMembers,getMember,updateMember,deleteMember}