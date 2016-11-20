/**
 * Created by boot on 4/4/16.
 */
angular.module('app.services', []).
    factory('userService', function($http, $q) {


    })
    .factory('updateProfileService',function($http,$q){
        return{
            updateProfile:function(profile){

                var def = $q.defer();
                $http({
                    url: '/profile/me',
                    method: 'put',
                    dataType: 'json',
                    data:profile
                }).success(function (data) {
                    def.resolve(data);

                }).error(function (data, status) {
                    def.reject(data);

                });
                return def.promise;

            },

            updatePass:function(oldPass,newPass){
                var def = $q.defer();
                $http({
                    url: 'profile/password',
                    method: 'post',
                    dataType: 'json',
                    data:{old:oldPass,new:newPass}
                }).success(function () {
                    def.resolve();

                }).error(function (data, status) {
                    def.reject(data,status);

                });
                return def.promise;
            }

            };

        }
    )

.factory('profileService',function($http, $q){
    return {
        getProfile: function () {
            var def = $q.defer();
            $http({
                url: '/profile/me',
                method: 'get',
                dataType: 'json',
                }).success(function (data) {
                def.resolve(data);
            }).error(function (data, status) {
                def.reject(data);
            });
            return def.promise;
        }

    } ;

})
    .factory('logoutService', function($http, $q) {
        return {

    logout: function() {
        var def = $q.defer();
        $http({
            url: '/logout',
            method: 'get'
        }).success(function(url) {
            def.resolve(url);
        }).error(function(data, status) {
            def.reject(data);
        });
        return def.promise;
    }

        };
    })

.factory('retrieveService', function($http, $q) {
        return {
            retrievePassw: function (username) {
                var def = $q.defer();
                $http({
                    url: 'password/retrieve/'+username,
                    method: 'post',
                    // data: username,
                    // headers: {'Content-Type': 'application/json'}
                }).success(function (data) {
                    def.resolve(data);
                }).error(function (data) {
                    def.reject(data);
                });
                return def.promise;
            }

        } ;
    });