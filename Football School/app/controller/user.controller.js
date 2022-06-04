const userModel = require("../database/models/user.models")
const postModel = require("../database/models/post.models")

//  const player= userModel.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('Hello World!');
//   res.end();
// }).listen(8080);
class User {

    static register = async (req, res) => {
        try {
            const player = new userModel(req.body)
            await player.save()
            res.status(200).send({
                apiStatus: true,
                data: player,
                message: "player added successfully"
            })

        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "player addeding problem"
            })

        }
    }
    static allUsers = async (req, res) => {

        try {
            const players = await userModel.find()
            res.status(200).send({
                apiStatus: true,
                data: players,
                message: "data fetched"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error in fetching "
            })
        }
    }
    static singleUser = async (req, res) => {
        try {
            const player = await userModel.findById(req.params.id)
            if (!player) {
                return res.status(404).send({
                    apiStatus: false,
                    data: {postModel,player},
                    message: "player not found"
                })
            }
            res.status(200).send({
                apiStatus: true,
                data: player,
                message: "data fetched"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error in fetching "
            })
        }

    }
    static login = async (req, res) => {
        try {
            let player = await userModel.loginUser(req.body.email, req.body.password)
            let token = await player.generateToken()
            res.status(200).send({
                apiStatus: true,
                data: { player, token },
                message: "player loggeding"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "player email notfound"
            })
        }
    }
    static me = async (req, res) => {
        res.send(req.user)
    }
    static logOut = async (req, res) => {
        try {
            req.user.tokens = req.user, tokens.filter(singleToken => {
                return singleToken.token != req.token
            })
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                data: {},
                message: "logged out "
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error on logout"
            })
        }
    }
    static logOutAll = async (req, res) => {
        try {
            req.user.tokens = []
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                data: {},
                message: "logged out "
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error on logout"
            })
        }
    }
    static activateWithoutLogin = async (req, res) => {
        try {
            const user = await userModel.loginUser(req.body.email, req.body.password)
            if (user.status) throw new Error("alerady activated")
            user.status = true
            await user.save()
            res.status(200).send({
                apiStatus: true,
                message: "updated",
                data: "updated"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error on updata password"
            })
        }
    }
    static editUser = async (req, res) => {
        try {
            const invalidEdits = ["password", "tokens", "status", "__v", "updatedAt"]
            for (const property in req.body) {
                if (!invalidEdits.includes(property))
                    req.user[property] = req.body[property]
            }
            req.user.save()
            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: "data updated"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error on updata "
            })
        }
    }
    static activate = async (req, res) => {
        try {
            if (req.user.status) throw new Error("already active")
            req.user.status = true
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                message: "updated",
                data: req.user
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error stats "
            })
        }
    }
}

module.exports = User
