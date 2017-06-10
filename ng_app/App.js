(function() {
    'use strict';
    var FilterApp = angular.module("FilterApp", [
        'ngRoute',
        'FilterApp.dashBoard'
    ])


    FilterApp.config(['$routeProvider', '$compileProvider', '$locationProvider',
        function($routeProvider, $compileProvider, $locationProvider) {
            $routeProvider
                .otherwise({
                    redirectTo: '/dashBoard'
                });
        }
    ]);

    FilterApp.run(function($rootScope, $window) {
        console.log("App started successfully!");
    });
    //FilterApp.filter('highlightWord', function () {
    //    return function (text, selectedWord) {
    //        if (selectedWord) {
    //            var pattern = new RegExp(selectedWord, "g");
    //            return text.replace(pattern, '<span class="highlighted">' + selectedWord + '</span>');
    //        }
    //        else {
    //            return text;
    //        }
    //    };
    //});

})();