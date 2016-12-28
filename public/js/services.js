/**
 * Created by boot on 4/4/16.
 */
angular.module('app.services', [])
    .factory('securityService',function($http,$q){
        return{
            updatePass:function(oldPass,newPass){
                var def = $q.defer();
                $http({
                    url: 'security/password',
                    method: 'post',
                    dataType: 'json',
                    data:{old:oldPass,new:newPass}
                }).success(function () {
                    def.resolve();

                }).error(function (data, status) {
                    def.reject(data,status);

                });
                return def.promise;
            },
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
        };
    })
    .factory('profileService',function($http, $q){
        var cacheProfile;
        return {
            getProfile: function () {
                var def = $q.defer();
                if (cacheProfile) {
                    def.resolve(cacheProfile);
                } else {
                    $http({
                        url: '/profile/me',
                        method: 'get',
                        dataType: 'json',
                    }).success(function (data) {
                        cacheProfile = data.profile;
                        def.resolve(cacheProfile);
                    }).error(function (data, status) {
                        def.reject(data);
                    });
                }
                return def.promise;
            },
            updateProfile:function(profile){
                var def = $q.defer();
                $http({
                    url: '/profile/me',
                    method: 'put',
                    dataType: 'json',
                    data:profile
                }).success(function (data) {
                    cacheProfile = profile;
                    def.resolve(data);
                }).error(function (data, status) {
                    def.reject(data);
                });
                return def.promise;
            }
        } ;
    })

    .factory('entityProfileService',function($http, $q){
        var cacheProfile;
        return {
            getProfile: function () {
                var def = $q.defer();
                if (cacheProfile) {
                    def.resolve(cacheProfile);
                } else {
                    $http({
                        url: '/entity/me',
                        method: 'get',
                        dataType: 'json',
                    }).success(function (data) {
                        cacheProfile = data.entity_profile;
                        def.resolve(cacheProfile);
                    }).error(function (data, status) {
                        def.reject(data);
                    });
                }
                return def.promise;
            },
            updateProfile:function(profile){
                var def = $q.defer();
                $http({
                    url: '/entity/me',
                    method: 'put',
                    dataType: 'json',
                    data:profile
                }).success(function (data) {
                    cacheProfile = profile;
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
    });