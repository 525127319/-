var router = require('koa-router')();
var UserController = require('./UserController');

router.post('/user/logincheck', UserController.logincheck);

module.exports = router;