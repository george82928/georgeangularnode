/**
 * Controller for the payslip function
 * 
 * @author George Zheng
 */
'use strict';
App.controller('PaySlipController', ['$scope', 'PaySlip', function($scope, PaySlip) {

    var self = this;
    self.paySlip = new PaySlip();
    self.response = {};
    self.paySlipCopy = {};
    self.rowServerError = false;
    self.serverErrorMessage = null;

    self.createPaySlip = function() {
        self.paySlip.$save(function(responsePaySlip, headers) {
            self.response = responsePaySlip;
            self.rowServerError = false;
        }, function(error) {
            self.rowServerError = true;
            self.serverErrorMessage = error.data.error;
        });
    };

    self.submit = function() {
        self.paySlipCopy = angular.copy(self.paySlip);
        self.createPaySlip();
        self.paySlip = self.paySlipCopy;
    };

    self.reset = function() {
        $scope.myForm.$setPristine();
        $scope.myForm.$setUntouched();
        self.paySlip = new PaySlip();
        self.response = {};
        self.paySlipCopy = {};
        self.rowServerError = false;
        self.serverErrorMessage = null;
    };
}]);