/**
 * Created by boot on 4/4/16.
 */
'use strict';

/* Controllers */
angular.module('app.controllers', [])
    .
    controller('sidebarController', function($scope, $window) {
        if ($window.location.hash == '#') {
            $window.location.href = '/';
        }
    }).
    controller('headerController', function($scope) {

    })

.controller('sidebarProfileController',function($scope,$window){
  $scope.profile={picture:"",first_name:"Marcelo",last_name:"Pasut"};

$scope.letters=$scope.profile.first_name.substr(0,1)+$scope.profile.last_name.substr(0,1);

})

;
