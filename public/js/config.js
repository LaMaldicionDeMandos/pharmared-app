app.config(function ($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/home");


        $stateProvider
        
            //------------------------------
            // HOME
            //------------------------------

            .state ('home', {
                url: '/home',
                templateUrl: '/partials/home',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.css',
                                ]
                            },
                            {
                                name: 'vendors',
                                insertBefore: '#app-level-js',
                                files: [
                                    'vendors/sparklines/jquery.sparkline.min.js',
                                    'vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
                                    'vendors/bower_components/simpleWeather/jquery.simpleWeather.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            //------------------------------
            // TYPOGRAPHY
            //------------------------------
        /*
            .state ('admins', {
                url: '/admins',
                templateUrl: '/partials/admin_user'
            })*/

            .state ('entity_profile', {
                url: '/entity_profile',
                templateUrl: '/partials/entity_profile'
            })
                     
            .state ('entity_profile.entity_profile_about', {
                url: '/entity_profile_about',
                templateUrl: 'partials/entity_profile_about'
            })


            .state ('user_profile', {
                url: '/user_profile',
                templateUrl: '/partials/user_profile'
            })
            .state ('user_profile.user_profile_about', {
                url: '/user_profile_about',
                templateUrl: 'partials/user_profile_about'
            })

            .state ('change_password', {
                url: '/change_password',
                templateUrl: 'partials/change_password'
            });



    /* .state ('profile', {
         url: '/profile/{id}',
         templateUrl: function($stateParams) {
             return '/partials/profile/' + $stateParams.id;
         }
     })
 */
    });
