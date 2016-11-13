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
  $scope.profile={picture:"",first_name:"marcelo",last_name:"pasut"};
  $scope.letters=($scope.profile.first_name.substr(0,1)+$scope.profile.last_name.substr(0,1)).toUpperCase();
  $scope.color_palette=['#ba68c8','#a1887f','#058be3','#4db6ac','#e06055','#fdd835','#f6bf26','#ff8a65','#4FC3F7','#D4E157'];

})

;
