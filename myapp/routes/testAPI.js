var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) =>{
    try {
        res.render('index',{title: 'testAPI',data : JSON.stringify(patienFecth)});
    } catch (err) {
        next(err);
    }
});


// router.get("/", authCheck, async (req, res, next) => {
//     try {
//     //listing messages in users mailbox 
//       let emailFetch = await gmaiLHelper.getEmails(req.user._doc.profile_id , '/messages', req.user.accessToken)
//       emailFetch = emailFetch.data
//       res.send(emailFetch)
//     } catch (err) {
//       next(err);
//     }
//   })

module.exports = router;
//heroku git:remote -a geneherokudb (connect heroku)
// git push --force heroku HEAD:master

//http://localhost:3000/testAPI/?patient_ID=1#/