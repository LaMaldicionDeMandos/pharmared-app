/**
 * Created by boot on 4/4/16.
 */
angular.module('app.services', []).
    factory('userService', function($http, $q) {


    })

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

});