(function() {
    angular.module('FilterApp.dashBoard.services', [])
        .factory('dashBoardService', dashBoardService);

    dashBoardService.$inject = ["$timeout", "$q", "$http"];

    function dashBoardService($timeout, $q, $http) {
        
        //call service to get JSON data
        var dashBoardService = {
            fetchProjectDetails: fetchProjectDetails
         
         

        };

        return dashBoardService;
      

        function fetchProjectDetails(params) {

            var def = $q.defer();

            var req = {
                method: 'GET',
                url: '../content/MOCK_DATA.json',


            }
            $http(req).then(function(response) {
                def.resolve({
                    projectData: response.data
                });
            }, function(arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }



    }
})();