/**
 * Main router of the application
 * 
 * @author George Zheng
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var ctrlPaySlip = require('../controllers/payslip.controller.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

// Route for path /payslip
router.route('/payslip').post(ctrlPaySlip.constructPaySlip);

module.exports = router;