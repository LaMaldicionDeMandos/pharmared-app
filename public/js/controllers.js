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

.controller('ProfileController',function($scope,profileService){
    $scope.editSummary = 0;
    $scope.editInfo = 0;
    $scope.editContact = 0;

    $scope.errors={};
    profileService.getProfile().then(
    function(data) {
        $scope.profile=data;
        $scope.letters=($scope.profile.first_name.substr(0,1)+$scope.profile.last_name.substr(0,1)).toUpperCase();
        $scope.prof=true;

     
    },
    function(error) {
        $scope.errors.getProfile= true;

    }
);
 // $scope.profile={picture:"",first_name:"marcelo",last_name:"pasut"};

  $scope.color_palette=['#e25f51','#f26091','#bb65ca','#9572cf','#7884cd','#5b95f9','#48c2f9','#45d0e2','#48b6ac','#52bc89','#9bce5f','#d4e34a','#feda10','#f7c000','#ffa800','#ff8a60','#c2c2c2','#8fa4af','#a2887e','#a3a3a3','#afb5e2','#b39bdd','#c2c2c2','#7cdeeb','#bcaaa4','#aed67d'];

    //Edit


    $scope.submit = function(item, message) {
        if (item === 'profileSummary') {
            $scope.editSummary = 0;
        }

        if (item === 'profileInfo') {
            $scope.editInfo = 0;
        }

        if (item === 'profileContact') {
            $scope.editContact = 0;
        }

    }



});



