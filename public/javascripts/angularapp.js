/**
 * Create app Module, include ngResource as dependency
 * 
 * @author George Zheng
 */
'use strict';
var App = angular.module('myApp', ['ngResource']);
App.constant('config', {
		href: window.location.href
});