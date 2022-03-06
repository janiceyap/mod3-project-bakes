const userService = require("../services/user.services");

class UserController {

    async register(req, res, next){

        const result = await userService.register(req.body);

        res.status(result.status);

        return res.json({
            status_code: result.status,
            message: result.message,
            data: result.data
        });
    }
   
    async showAll(req, res, next){

        const result = await userService.showAll();

        res.status(result.status);

        return res.json({
            status_code: result.status,
            message: result.message,
            data: result.data
        });
    }

    async deleteUser(req, res, next){

        const result = await userService.deleteUser(req.body.id);

        res.status(result.status);

        return res.json({
            status_code: result.status,
            message: result.message,
        });
    }
}

module.exports = UserController;