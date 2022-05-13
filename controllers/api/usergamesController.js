const { UserGames, UserGamesBiodata, UserGamesHistory } = require("../../models");
const bcrypt = require("bcryptjs");

exports.getUserGames = (req, res, next) => {
  UserGames.findAll({
    include:
    [
      {model: UserGamesBiodata, as : "biodata"},
      {model: UserGamesHistory, as : "history"}
    ]})
    .then((user_games) => {
      res.status(200).json({
        success: "Success get data user games",
        data: user_games,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message : error.message
      });
    });
};

exports.addUserGames = (req, res, next) => {
  const { username, password, email} = req.body;
  const now = new Date();
  UserGames.create({
    username,
    password: bcrypt.hashSync(password, 8),
    email,
    now,
    now,
  })
    .then((data) => {
      res.status(201).json({
        success: "Success insert data user games",
        dataInsert: data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message : error.message
      });
    });
};

exports.createUserGames = (req, res, next) => {
  const { username, password, email} = req.query;
  const now = new Date();
  UserGames.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }
    // Email
    UserGames.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
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
          res.status(201).json({
            success: "Success insert data user games",
            dataInsert: data,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message : error.message
          });
        });
    });
  });
  
};
exports.getUserGamesById = (req, res, next) => {
  const id = req.params.id;
  UserGames.findByPk(id, {
    include:
    [
      {model: UserGamesBiodata, as : "biodata"},
      {model: UserGamesHistory, as : "history"}
    ]
  })
    .then((usergames) => {
      if (!usergames) {
        const error = new Error(`Could not find user games with id = ${id}`);
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        success: `Success find user games with id = ${id}`,
        data: usergames,
      });
    })
    .catch((error) => {
      if (!error.status) error.status = 500;
      next(error);
    });
};

exports.updateUserGames = (req, res, next) => {
  const id = req.params.id;
  const { username, password, email} = req.body;
  const now = new Date();
  UserGames.findByPk(id)
    .then((usergames) => {
      if (!usergames) {
        const error = new Error(`Could not find user games with id = ${id}`);
        error.status = 404;
        throw error;
      }
      UserGames.update(
        {
          username,
          password: bcrypt.hashSync(password, 8),
          email,
          now,
        },
        {
          where: { id },
        }
      );
      res.status(200).json({
        success: `Success update user games with id = ${id}`
      });
    })
    .catch((error) => {
      if (!error.status) error.status = 500;
      next(error);
    });
};

exports.deleteUserGames = (req, res, next) => {
  const { id } = req.params;
  UserGames.findByPk(id)
    .then((data) => {
      if (!data) {
        const error = new Error(`Could not find user games with id = ${id}`);
        error.status = 404;
        throw error;
      }
      UserGames.destroy({
        where: { id },
      });
      res.status(200).json({
        success: `Success delete user games with id = ${id}`
      });
    })
    .catch((error) => {
      if (!error.status) error.status = 500;
      next(error);
    });
};
