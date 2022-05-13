const { UserGames, UserGamesBiodata, UserGamesHistory } = require("../../models");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
    res.render('login')
}

exports.register = (req, res) => {
    res.render('register')
}

exports.registerproses = (req, res, next) => {
    const { username, password, email } = req.body;
    const now = new Date();
    UserGames.findOne({
      where: {
        username: username
      }
    }).then(user => {
      if (user) {
        res.status(400).render('errors/error', { status: 400,message: "Failed! Username is already in use!" })
        return;
      }
      // Email
      UserGames.findOne({
        where: {
          email: email
        }
      }).then(user => {
        if (user) {
          res.status(400).render('errors/error', { status: 400,message: "Failed! Email is already in use!" })
          return;
        }
        UserGames.create({
          username,
          password: bcrypt.hashSync(password, 8),
          email,
          now,
          now,
        })
          .then((data) => {
            res.status(201).redirect("login");
          })
          .catch((error) => {
            res.status(500).render('errors/error', { status: 500,message: error.message })
          });
      });
    });
  
  };

// exports.logout = (req, res) => {
//     req.session.token = null
//     res.redirect('/login')
// }