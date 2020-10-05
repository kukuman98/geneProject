const database = require('./async-db.js')

function _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

async function getAllMembers(){
    var sqlcommand = "select `ID`,`username`,`email`,`phone`,`level` from `member`";
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
    var sqlCommand = "SELECT `ID`,`username`,`email`,`phone`,`level` FROM `member` WHERE `ID` = ?";
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

async function updateMember(ID, username, email, phone, level){
    var sqlCommand = "UPDATE `member` SET `username` = ?,`email` = ?,`phone` = ?,`level` = ? WHERE `ID` = ?";
    const inserts = [username, email, phone, level,ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        return {code:204,message:'member updated successfully'}
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
        return {code:204,message:'member deleted successfully'}
    }
    catch(err){
        return Promise.reject(err);
    }
}

async function register(username,password,email,phone,level){

    try {
        var member_ID = _uuid()
        console.log(member_ID)
        let sql = "INSERT into `member` (`ID`,`username`, `password`, `email`, `phone`,`level`) VALUE (?,?,?,?,?,?)";
        const inserts = [member_ID,username,password,email,phone,level];
        sqlCommand = database.format(sql, inserts);
        await database.query(sqlCommand);
        return {code:201,message:'member register successfully'}
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
        return {code:204,message:'password updated successfully'}
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


module.exports = { register,modify,login,getAllMembers,getMember,updateMember,deleteMember}