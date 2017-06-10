(function() {
    "use strict";

    angular.module('FilterApp.dashBoard', [
            "FilterApp.dashBoard.controllers",
            "FilterApp.dashBoard.services",
        ])
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/dashBoard', {
            controller: 'dashBoardController',
            controllerAs: 'dashBoardVM',
            templateUrl: 'ng_app/components/dashBoard/dashBoard.html',
            //resolve: {}
        });
    }

})();