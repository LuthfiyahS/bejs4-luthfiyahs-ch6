const router = require("express").Router();
const usergames = require("./userGamesRouter")
const usergamesbiodata = require("./userGamesBiodataRouter")
const usergameshistory = require("./userGamesHistoryRouter")


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }  
    res.redirect('/login');
}
  

router.get('/', (req, res) => {
    res.render('login')
})

router.use("/dashboard", checkAuthenticated, (req, res) => {res.render('pages/index')})
router.use("/user-games", checkAuthenticated, usergames)
router.use("/user-games-biodata",checkAuthenticated, usergamesbiodata)
router.use("/user-games-history",checkAuthenticated, usergameshistory)


module.exports = router