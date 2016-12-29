/**
 * Created by aida on 28/12/16.
 */
angular.module('app.directives', [])
    .directive('capitalizeWords', function($parse) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                var capitalize = function(inputValue) {
                    if (inputValue == undefined || inputValue.length == 0) return inputValue;
                    var arr = inputValue.split(' ');
                    arr = arr.map(function(item) {
                        if (item.length > 0) {
                            return item.charAt(0).toUpperCase() + item.substring(1);
                        } else {
                            return ' ';
                        }
                    });
                    var capitalized = arr.reduce(function(o, n){
                        return o.length != 0 ? o + ' ' + n : n;
                    }, '');
                    if(capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
            }
        };
    });


