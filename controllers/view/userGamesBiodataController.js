const { UserGames, UserGamesBiodata } = require("../../models");
const moment = require("moment");

exports.get =  (req, res, next) => {
  UserGamesBiodata.findAll({ include: [{model: UserGames, as : "user"}] })
    .then((user_games_biodata) => {
        let user_current = req.user
        let token = req?.session?.token
      
        console.log(user_current)
        res.status(200).render('pages/user_games_biodata/', { user_games_biodata,moment, token: token, user_current: user_current })
    })
    .catch((error) => {
      res.status(500).render('errors/error', { status: 500,message: error.message })
    });
};

exports.add = (req, res, next) => {
    res.render("pages/user_games_biodata/add")
  };
  
exports.create = (req, res, next) => {
  let { user_id, fullname, gender, date_of_birth, place_of_birth, address } = req.body

  const checkUserGames = (user_id, success, failed) => {
    UserGames.findOne({ where: { id: user_id } }).then((UserGames) => {
      return success(UserGames)
    }).catch((err) => {
      return failed(err)
    })
  }

  checkUserGames(user_id, (data) => {
    if (!data) {
      return res.status(200).json({
        'message': 'User game id not found',
      })
    }

    UserGamesBiodata.create({
      user_id: user_id,
      fullname: fullname,
      gender: gender,
      date_of_birth: date_of_birth,
      place_of_birth: place_of_birth,
      address: address,
    }).then((userbiodata) => {
        res.status(201).redirect(`/user-games/biodata/${user_id}`);
    }).catch((error) => {
      res.status(500).render('errors/error', { status: 500,message: error.message })
    })
  }, (error) => {
    console.log(error)
    return res.status(400).json({
      'message': 'Failed'
    })
  })
};

exports.getUserGamesBiodataById = (req, res, next) => {
  const id = req.params.id;
  UserGamesBiodata.findOne({
    include: [{model: UserGames, as : "user"}],
    where: { user_id: req.params.id }
  })
    .then((user_games_biodata) => {
      if (!user_games_biodata) {
        res.status(400).render("pages/user_games_biodata/add",{user_id:id})
      }else{
        res.status(200).render("pages/user_games_biodata/show",{user_games_biodata,moment})
      }
    })
    .catch((error) => {
      res.status(500).render('errors/error', { status: 500,message: error.message })
    });
};

exports.update =  (req, res, next) => {
  let id= req.body?.id;
  let userbiodata_data = {
    id: req.body?.id,
    user_id: req.body?.user_id,
    fullname: req.body?.fullname,
    gender: req.body?.gender,
    date_of_birth: req.body?.date_of_birth,
    place_of_birth: req.body?.place_of_birth,
    address: req.body?.address,
  }
  let query = {
    where: {
      id: id
    }
  }
console.log(id)
console.log(userbiodata_data)
  const checkUserGames = (user_id, success, failed) => {
    UserGames.findOne({ where: { id: user_id } }).then((UserGames) => {
      return success(UserGames)
    }).catch((err) => {
      res.status(500).render('errors/error', { status: 500,message: error.message })
    })
  }

  const checkBefore = (id, success, failed) => {
    UserGamesBiodata.findOne({ where: { id: id } }).then((userbiodata) => {
      return success(userbiodata)
    }).catch((err) => {
      res.status(500).render('errors/error', { status: 500,message: error.message })
    })
  }

  checkUserGames(userbiodata_data.user_id, (data) => {
    if (!data) {
      return res.status(200).json({
        'message': 'User game id not found',
      })
    }

    checkBefore(id, (data) => {
      if (!data) {
        return res.status(200).json({
          'message': 'Data not found',
        })
      }

      UserGamesBiodata.update(userbiodata_data, query).then((userbiodata_data) => {
        return res.status(200).redirect(`/user-games/biodata/${userbiodata_data.user_id}`);
      }).catch((error) => {
        res.status(500).render('errors/error', { status: 500,message: error.message })
      });
    }, (err) => {
      console.log(err)
      return res.status(400).json({
        'message': 'Failed'
      })
    })
  }, (err) => {
    console.log(err)
    return res.status(400).json({
      'message': 'Failed'
    })
  })
};

exports.delete =  (req, res, next) => {
  let id = req.params.id;
  let userbiodata_data = {
    id: req.body?.id,
    user_id: req.body?.user_id,
  }
  console.log(`idnya ${userbiodata_data.id}`)
  UserGamesBiodata.findByPk(id)
    .then((data) => {
      if (!data) {
        const error = new Error(`Could not find user games biodata with id = ${id}`);
        error.status = 404;
        throw error;
      }
      UserGamesBiodata.destroy({
        where: { id },
      });
      console.log(id)
      res.status(200).redirect(`/user-games/biodata/${userbiodata_data.user_id}`);
    })
    .catch((error) => {
      res.status(500).render('errors/error', { status: 500,message: error.message })
    });
};

exports.del =  (req, res, next) => {
  let id = req.params.id;
  UserGamesBiodata.findByPk(id)
    .then((data) => {
      if (!data) {
        const error = new Error(`Could not find user games biodata with id = ${id}`);
        error.status = 404;
        throw error;
      }
      UserGamesBiodata.destroy({
        where: { id },
      });
      console.log(id)
      res.status(200).redirect(`/user-games-biodata`);
    })
    .catch((error) => {
      res.status(500).render('errors/error', { status: 500,message: error.message })
    });
};
