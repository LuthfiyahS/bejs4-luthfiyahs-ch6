const express = require('express')
const router = express.Router()
const ctl = require('../../controllers/view/userGamesController')
const ctlbio = require('../../controllers/view/userGamesBiodataController')
const ctlhis = require('../../controllers/view/userGamesHistoryController')

router.get('/', ctl.index)

router.get('/add', ctl.addUserGames)
router.post('/add', ctl.createUserGames)

router.get('/update/:id', ctl.show)
router.put('/update/:id', ctl.updateUserGames)

router.get('/delete/:id', ctl.deleteUserGames)
router.delete('/delete/:id', ctl.deleteUserGames)

router.get('/biodata/:id', ctlbio.getUserGamesBiodataById)
router.post('/biodata', ctlbio.create)

router.put('/biodata/update/:id', ctlbio.update)
router.delete('/biodata/delete/:id', ctlbio.delete)

router.get('/history/:id', ctlhis.getUserGamesHistoryById)
router.post('/history', ctlhis.create)

router.put('/history/update/:id', ctlhis.update)
router.get('/history/delete/:id', ctlhis.del)
router.delete('/history/delete/:id', ctlhis.delete)

module.exports = router