/**
 * Resources object used to send HTTP request to the server 
 * 
 * @author George Zheng
 */
'use strict';
App.factory('PaySlip', ['$resource', 'config', function ($resource, config) {
    return $resource(
            config.href + 'payslip/:id', 
            {id: '@id'},
            {
                update: {
                	// To send the HTTP Put request when calling this custom update method.
                	// Currently this method is not used
                      method: 'PUT' 
                }
            }
    );
}]);