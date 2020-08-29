var express = require('express');
var router = express.Router();

var mms = require('../../utils/MMS');

router.get('/',async (req, res, next) => {
    try {
        let memberFecth = await mms.getAllMembers()
        res.send(memberFecth);
    } catch (err) {
        next(err);
    }
});

router.get('/detail/',async (req,res,next) => {
    try {
        let member_ID = req.query['ID'];
        let memberFecth = await mms.getMember(member_ID);
        res.send(memberFecth);
    } catch(err){
        next(err);
    }
});

router.put('/detail/',async (req,res,next) => {
    try {
        let data = req.query;
        let memberFecth = await mms.updateMember(data['ID'],data['username'],data['password'],data['email'],data['phone'],data['level']);
        res.send(memberFecth);
    } catch(err){
        next(err);
    }
});

router.delete('/detail/',async (req,res,next) => {
    try {
        let member_ID = req.query['ID'];
        let memberFecth = await mms.deleteMember(member_ID);
        res.send(memberFecth);
    } catch(err){
        next(err);
    }
});

router.put('/modify/', async (req,res,next)=>{
    try {
        let data = req.query;
        let memberFecth = await mms.modify(data['ID'],data['field'],data['value']);
        res.send(memberFecth);
    } catch(err){
        next(err);
    }
})
module.exports = router;
//heroku git:remote -a geneherokudb (connect heroku)
// git push --force heroku HEAD:master

//http://localhost:3000/testAPI/?patient_ID=1#/