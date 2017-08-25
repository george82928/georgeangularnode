/**
 * Controller used for handling the payslip request and 
 * sending the response
 * 
 * @author George Zheng
 */
"use strict";

var paySlipController = {};
var payService = require('../services/payslip.service.js');

/**
 * Handle the http request and call payslip service to construct
 * the response object
 * @param  {Object} req Http rquest
 * @param  {Object} res Http response
 */
paySlipController.constructPaySlip = function(req, res) {

    var serviceModel = {
        annualSalary: req.body.annualSalary,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        paymentMonth: req.body.paymentMonth,
        superRate: req.body.superRate
    };
    var result = payService.buildPaySlip(serviceModel);
    res.status(200).json(result);
};

module.exports = paySlipController;