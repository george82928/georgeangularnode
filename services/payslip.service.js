/**
 * Service used for calculating the value and build the payslip
 *
 * @author George Zheng
 */
"use strict";

var payService = {};

var math = require('mathjs');

math.config({
    number: 'BigNumber', // Default type of number:
    // 'number' (default), 'BigNumber', or 'Fraction'
    precision: 20 // Number of significant digits for BigNumbers
});

/**
 * Get gross income per month based on annual salary. 
 * GrossIncome = Annual salary / 12
 * @param  {Number} annualSalary AnnualSalary value
 * @return {Number} Gross income of this month
 */
function getGrossIncome(annualSalary) {
    return math.round(math.format(math.divide(annualSalary, 12)));
}

/**
 * Get full name of the person
 * @param  {String} firstName First name of a person
 * @param  {String} lastName  Last name of a person
 * @return {String} Full name of a person
 */
function getFullName(firstName, lastName) {
    return firstName.concat(' ').concat(lastName);
}

/**
 * Get the tax value paid on this month
 * @param  {Number} annualSalary AnnualSalary value
 * @return {Number} Tax paid of this month
 */
function getTax(annualSalary) {
    var result = 0;
    if (annualSalary > 18200 && annualSalary <= 37000) {
        result = math.divide(math.multiply(math.subtract(annualSalary, 18200), 0.19), 12);
    } else if (annualSalary >= 37001 && annualSalary <= 80000) {
        result = math.divide(math.add(math.multiply(math.subtract(annualSalary, 37000), 0.325), 3572), 12);
    } else if (annualSalary >= 80001 && annualSalary <= 180000) {
        result = math.divide(math.add(math.multiply(math.subtract(annualSalary, 80000), 0.37), 17547), 12);
    } else if (annualSalary >= 180001) {
        result = math.divide(math.add(math.multiply(math.subtract(annualSalary, 180000), 0.45), 54547), 12);
    }
    return math.round(math.format(result));
}

/**
 * Get supper annuation paid on this month
 * @param  {Number} grossIncome Gross income of this month
 * @param  {Number} superRate   Super rate
 * @return {Number} Super paid on this month
 */
function getSuper(grossIncome, superRate) {
    var superDecimal = math.divide(superRate, 100);
    return math.round(math.format(math.multiply(grossIncome, superDecimal)));
}

/**
 * Get net income of this month
 * @param  {Number} grossIncome Gross income of this month
 * @param  {Number} tax         Tax paid on this month
 * @return {Number}             Net income
 */
function getNetIncome(grossIncome, tax) {
    return math.round(math.format(math.subtract(grossIncome, tax)));
}

/**
 * Construct pay slip object
 * @param  {Object} serviceModel service model object
 * @return {Object}              pay slip object
 */
payService.buildPaySlip = function(serviceModel) {
    var fullName = getFullName(serviceModel.firstName, serviceModel.lastName);
    var grossIncome = getGrossIncome(serviceModel.annualSalary);
    var tax = getTax(serviceModel.annualSalary);
    var netIncome = getNetIncome(grossIncome, tax);
    var superannuation = getSuper(grossIncome, serviceModel.superRate);

    return {
        fullName: fullName,
        payPeriod: serviceModel.paymentMonth,
        grossIncome: grossIncome,
        tax: tax,
        netIncome: netIncome,
        superannuation: superannuation
    };
};

module.exports = payService;