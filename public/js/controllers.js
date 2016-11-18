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

.controller('profileController',function($scope,profileService,updateProfileService, cfpLoadingBar){

    $scope.valid=true;
    $scope.editSummary = 0;
    $scope.editInfo = 0;
    $scope.editContact = 0;
    $scope.editPhrase = 0;
    $scope.form={};
    $scope.form.address={};
    $scope.errors={};
    profileService.getProfile().then(
    function(data) {
        $scope.profile=data.profile;
        if (!$scope.profile.address){
        $scope.profile.address={};
        }

        $scope.user_id=data.user_id;
        asignProfileToForm();


        $scope.letters=($scope.profile.first_name.substr(0,1)+$scope.profile.last_name.substr(0,1)).toUpperCase();
        $scope.prof=true;


    },
    function(error) {
        $scope.errors.getProfile= true;

    }
);
 // $scope.profile={picture:"",first_name:"marcelo",last_name:"pasut"};

  $scope.color_palette=['#e25f51','#f26091','#bb65ca','#9572cf','#7884cd','#5b95f9','#48c2f9','#45d0e2','#48b6ac','#52bc89','#9bce5f','#d4e34a','#feda10','#f7c000','#ffa800','#ff8a60','#c2c2c2','#8fa4af','#a2887e','#a3a3a3','#afb5e2','#b39bdd','#c2c2c2','#7cdeeb','#bcaaa4','#aed67d'];

    $scope.editInf=function(){
      $scope.editInfo=1;

    };

    $scope.cancEditInfo=function(){
        $scope.editInfo=0;
        asignProfileToForm();
        $scope.errors={};
    };
    $scope.editSum=function(){
        $scope.editSummary=1;

    };
    $scope.cancEditSum=function(){
        $scope.editSummary=0;
        asignProfileToForm();
        $scope.errors={};
    };
    $scope.editCont=function(){
        $scope.editContact=1;
    };
    $scope.cancEditCont=function(){
        $scope.editContact=0;
        asignProfileToForm();
        $scope.errors={};
    };
    $scope.editPh=function(){
        $scope.editPhrase=1;
    };
    $scope.cancEditPh=function(){
        $scope.editPhrase=0;
        asignProfileToForm();
        $scope.errors={};
    };


    $scope.guardar=function(){


        if ($scope.valid) {
            $scope.profile.phrase = $scope.form.phrase;
            $scope.profile.summary = $scope.form.summary;
            $scope.profile.first_name = $scope.form.first_name;
            $scope.profile.last_name = $scope.form.last_name;
            $scope.profile.phone = $scope.form.phone;
            $scope.profile.email = $scope.form.email;
            $scope.profile.twitter = $scope.form.twitter;
            $scope.profile.skype = $scope.form.skype;
            $scope.profile.gender = $scope.form.gender;
            $scope.profile.birthday = $scope.form.birthday;
            $scope.profile.martial_status = $scope.form.martial_status;
            $scope.profile.address.street = $scope.form.address.street;
            $scope.profile.address.number = $scope.form.address.number;
            $scope.profile.address.city = $scope.form.address.city;
            $scope.profile.address.province = $scope.form.address.province;


            updateProfileService.updateProfile($scope.profile).then(
                function () {

                },
                function (error) {
                    $scope.errors.updateProfile = true;
                    console.log('update profile error');
                }
            );
        }

    };
    //Edit


    $scope.submit = function(item, message) {
       if($scope.valid){
        if (item === 'profileSummary') {
            $scope.editSummary = 0;
        }

        if (item === 'profileInfo') {
            $scope.editInfo = 0;

        }

        if (item === 'profileContact') {
            $scope.editContact = 0;
        }

           if (item === 'profilePhrase') {
               $scope.editPhrase = 0;
           }


    }};


    $scope.validateChangeFirstName = function(first_name) {
        $scope.valid = true;
        if (!first_name || first_name.length == 0) {
            $scope.errors.first_name = true;
           $scope.valid = false;
        }

        return {err:$scope.errors,valid:$scope.valid};
    };

    $scope.validateChangeLastName = function(last_name) {
        $scope.valid = true;
        if (!last_name || last_name.length == 0 ) {
            $scope.errors.last_name = true;
            $scope.valid = false;
        }
        return {err:$scope.errors,valid:$scope.valid};
    };


    $scope.validateChangeEmail = function(email) {

        $scope.valid = true;

        if (email.length>0){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(email)) {
            $scope.errors.email = true;
            $scope.valid = false;

       }}
        return {err:$scope.errors,valid:$scope.valid};
    };

var asignProfileToForm=function() {
    $scope.form.phrase = $scope.profile.phrase;
    $scope.form.summary = $scope.profile.summary;
    $scope.form.first_name = $scope.profile.first_name;
    $scope.form.last_name = $scope.profile.last_name;
    $scope.form.phone = $scope.profile.phone;
    $scope.form.email = $scope.profile.email;
    $scope.form.twitter = $scope.profile.twitter;
    $scope.form.skype = $scope.profile.skype;
    $scope.form.gender = $scope.profile.gender;
    $scope.form.birthday = $scope.profile.birthday;
    $scope.form.martial_status = $scope.profile.martial_status;
    $scope.form.address.street = $scope.profile.address.street;
    $scope.form.address.number = $scope.profile.address.number;
    $scope.form.address.city = $scope.profile.address.city;
    $scope.form.address.province = $scope.profile.address.province;
}

    $scope.updatePhoto = function(file) {
        if (!file) return;
        cfpLoadingBar.start();
        var task = firebase.storage().ref().child('photos/' + $scope.user_id).put(file);
        task.on('state_changed', function(snapshot){
            console.log('Progress: ' + snapshot);
        }, function(error) {
            console.log('Error: ' + error);
          //  swal({title:'Ops!', text:'La foto no pudo cambiarse.', type:'error'});
        }, function() {
            var downloadURL = task.snapshot.downloadURL;
            console.log('Success!! :) ' + downloadURL);
            $scope.profile.picture = downloadURL;
      //      console.log('La foto no pudo cambiarse.', 'photo');
            updateProfileService.updateProfile($scope.profile).then(
                function () {
                    console.log($scope.prof);
                },
                function (error) {
                    $scope.errors.updateProfile = true;
                    console.log('update profile error');
                }
            );
        });
    };

    $scope.logout = function() {
        var success = function() {
            $window.location.href = '/index';
        };
        var fail = function(error) {
            console.log('Error on logout ' + error);
        };
        profileService.logout().then(success, fail);
    };



})

    .controller('securityController',function($scope, cfpLoadingBar,retrieveService) {
        $scope.valid=true;
        $scope.errors={};
        $scope.form={};
        $scope.form.forgotPass=false;




        $scope.validateNewPass=function(newPass){
            var validPass=validatePass(newPass,'new');
            if (!validPass){
                $scope.errors.new_pass=true;
            }

        };

        $scope.validatePassRepeat=function(passRepeat,newPass){
            var validPass=validatePass(passRepeat,'repeat');
            if (!validPass){
                $scope.errors.new_pass_repeat=true;
            }
            if (passRepeat!=newPass && (passRepeat || newPass)){
                $scope.errors.new_pass_missmatch=true;
            }
        };



        var validatePass=function(pass,typePass){
            if (typePass=='old'){
                $scope.errors.actual_pass=false;
            }
            if (typePass=='new'){
                $scope.errors.new_pass=false;
            }
            if (typePass=='repeat'){
                $scope.new_pass_repeat=false;
                $scope.errors.new_pass_missmatch=false;
            }


            $scope.valid=true;
            var re=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!re.test(pass)) {
                $scope.valid = false;
            };
            return $scope.valid;
        };
        $scope.delNew=function(){
            $scope.form.new_pass_repeat="";
            $scope.errors.new_pass_repeat=false;
            $scope.errors.new_pass_missmatch=false;
            $scope.errors.new_pass=false;
        };

        $scope.delActual=function() {
            $scope.errors.actual_pass = false;
        };


        $scope.delRepeat=function() {
            $scope.errors.new_pass_missmatch=false;
            $scope.errors.new_pass_repeat=false;
        };


        $scope.guardarPass=function(oldPass,newPass) {
            if ($scope.valid && newPass) {
                updateProfileService.updatePass(oldPass, newPass).then(
                    function () {
                        console.log('update pass ok');
                    },
                    function (data,error) {
                        $scope.errors[data] = true;
                        console.log(data);
                    }
                );
            }

        }

        $scope.forgotP = function() {

            $scope.form.forgotPass="true";

        };

        $scope.retrievePass=function(mailRet) {
            $scope.errors = {};
            var valid = validateRetrievePass(mailRet);
            if (valid) {

                var success = function () {
                    $scope.successRet = true;

                };
                var fail = function () {
                    $scope.errors.retrieve = "true";

                };
                retrieveService.retrievePassw(mailRet).then(success, fail);
            } else {
                $scope.errors.email = true;
            }



        };

        var validateRetrievePass=function(mailRet)
        {
            var valid = true;

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!re.test(mailRet)) {
                valid = false;
            }


            return valid;
        };


        $scope.cancRet=function(){

          $scope.form.forgotPass=false;
        };
    });