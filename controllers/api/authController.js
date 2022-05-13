const { UserGames, UserGamesBiodata, UserGamesHistory } = require("../../models")
const jwt = require('jsonwebtoken')
const moment = require('moment')
const privateKey = 'challeng-bejs'
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
    let { username, password } = req.body
    let user_games = await UserGames.findOne({ where: { username: username } })
    if (!user_games?.username) {
        return res.status(200).json({
            'message': 'Username not found'
        })
    }

    // if (password != user_games?.password) {
    //     return res.status(200).json({
    //         'message': 'Invalid password'
    //     })
    // }
    var passwordIsValid = bcrypt.compareSync(
        password,
        user_games?.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

    let token = jwt.sign({
        id: user_games?.id,
        username: username,
        password: password
    }, privateKey, {
        expiresIn: '1d'
    });

    await UserGames.update({
        token: token
    }, {
        where: {
            id: user_games.id
        }
    })

    req.session.token = token

    return res.status(200).json({
        'message': 'Username & Password is Correct',
        'data': {
            'token': token,
            'expired_at': moment().add(365, 'days').format('YYYY-MM-DD HH:mm:ss')
        }
    })
}

exports.register = async (req, res) => {
    let { username, password } = req.body
    UserGames.create({
        username: username,
        password: bcrypt.hashSync(password, 8)
    }).then((UserGames) => {
        return res.status(200).json({
            'message': 'Register success, please sign in',
            'data': UserGames
        })
    }).catch((err) => {
        return res.status(500).json({
            'message': 'Failed'
        })
    })
}


