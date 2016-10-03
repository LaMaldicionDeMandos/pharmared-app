/**
 * Created by boot on 4/4/16.
 */
'use strict';

/* Controllers */
angular.module('app.controllers', []).
    controller('sidebarController', function($scope, $window) {
        if ($window.location.hash == '#_=_') {
            $window.location.href = '/';
        }
    }).
    controller('headerController', function($scope) {

    });
