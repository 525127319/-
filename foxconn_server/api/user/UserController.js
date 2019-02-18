const UserService = require('./UserService');
const RSUtil = require('../../utils/RSUtil');
const errorUtil = require('../../utils/ErrorUtil');

class UserController {
    async logincheck(ctx){
        try {
            let params = ctx.request.fields;
            let uname = params.username;
            let pwd = params.password;
            let result = await UserService.findOne({username: uname, password: pwd});
            ctx.body = RSUtil.ok(result);
        } catch (error) {
            errorUtil.responseError(ctx,error,"查找失败");
        }
    }
}

module.exports = new UserController();