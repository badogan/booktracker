const express = require('express');

const searchBookController = require('../controllers/searchBookController');

const router = express.Router();

router.route('/searchbook').post(searchBookController.searchBook);

module.exports = router;
