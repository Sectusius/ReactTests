var express = require('express');
const router = express.Router();
const sectionController = require('../controllers/section.controller');

router.post('/addSection', sectionController.createSection);
router.get('/getSection/:title', sectionController.getSectionByTitle);
router.put('/updateSection/:title', sectionController.updateSection);
router.delete('/deleteSection/:title', sectionController.deleteSection);

module.exports = router;
