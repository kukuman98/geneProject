var express = require('express');
var router = express.Router();
var mms = require('../../utils/MMS');
const jwt = require('jsonwebtoken')
router.post('/', function (req, res, next) {
    const data = req.body
    let fetchmms = mms.register(data['username'], data['password'],data['email'], data['phone'], data['level'])
        .then(function (uid) {
            const token = 'Bearer ' + jwt.sign(
                {
                    uid: uid,
                    admin: false
                },
                'secret12345',
                {
                    expiresIn: 3600 * 24 * 3
                }
            )
            res.json({token:token,err:null})
        })
        .catch(function (err) {
            res.json({err:String(err)})
        })
    res.status(fetchmms['code']).send(fetchmms['message']);
});

module.exports = router;

//  heroku git:remote -a geneherokudb (connect heroku)
//  git push --force heroku HEAD:master