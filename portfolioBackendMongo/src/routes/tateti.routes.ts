var express = require('express');
var router = express.Router();
const tatetiController = require('../controllers/tateti.controller');

router.post('/addTaTeTi', tatetiController.createTaTeTi);
router.get('/getAllWinsByPlayer/:player', tatetiController.getAllWinsByPlayer);
router.get('/getAllData', tatetiController.getAllData);

module.exports = router;