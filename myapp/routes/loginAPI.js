var express = require('express');
var router = express.Router();
var mms = require('../../utils/MMS');
const jwt = require('jsonwebtoken')
router.post('/', function (req, res, next) {
    const data = req.body
    mms.login(data['email'], data['password'])
        .then(function (info) {
            const token = 'Bearer ' + jwt.sign(
                {
                    uid: info.ID,
                    admin: info.level === 3, //1 = viewer, 2 = staff, 3 = admin
                    staff: info.level === 2,
                },
                'secret12345',
                {
                    expiresIn: 3600 * 24 * 3
                }
            )
            res.json({ token: token})

        })
        .catch(function (err) {
            res.json({ erro: String(err) })
        })
});


module.exports = router;

//  git push --force heroku HEAD:master