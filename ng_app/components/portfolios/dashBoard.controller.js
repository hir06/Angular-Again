(function() {
    "use strict";
    angular.module('FilterApp.dashBoard.controllers', [])
        .controller('dashBoardController', dashBoardController);

    dashBoardController.$inject = ['$rootScope', '$sce', '$route', '$location', '$timeout', '$interval', '$filter', 'AppService', 'dashBoardService'];

    function dashBoardController($rootScope, $sce, $route, $location, $timeout, $interval, $filter, AppService, dashBoardService) {
        var _this = this;

        window.scrollTo(0, 0);
        _this.AppService = AppService;

        _this.project = "";
        _this.showGroup = [];
        _this.filtered = false;
        _this.showComponent = true;
        _this.showAll = showAll;
        //place JSON data here if web server is not present in machine.

        _this.data = [{
                "id": 736,
                "name": "Systems",
                "image": {
                    "link": "http://i.stack.imgur.com/8KA9j.jpg?s=32&g=1"
                },
                "groups": [{
                        "id": 2168,
                        "name": "API",
                        "url": "https://wwww.itschools.co.za/api/"
                    },
                    {
                        "id": 11955,
                        "name": "Assets",
                        "url": "https://wwww.itschools.co.za/assets/"
                    },
                    {
                        "id": 3179,
                        "name": "Design",
                        "url": "https://wwww.itschools.co.za/design/"
                    },
                    {
                        "id": 207,
                        "name": "Development",
                        "url": "https://wwww.itschools.co.za/development/"
                    },
                    {
                        "id": 70,
                        "name": "Intranet",
                        "url": "https://wwww.itschools.co.za/intranet/"
                    }
                ],
                "url": "https://wwww.itschools.co.za/projects"
            },
            {
                "id": 44315,
                "name": "User Agents",
                "image": {
                    "link": "http://i.stack.imgur.com/8KA9j.jpg?s=32&g=1"
                },
                "groups": [{
                        "id": 191599,
                        "name": "Alchemy",
                        "url": "https://wwww.itschools.co.za/tools/alchemy"
                    },
                    {
                        "id": 86822,
                        "name": "Empathy",
                        "url": "https://wwww.itschools.co.za/tools/empathy"
                    },
                    {
                        "id": 86297,
                        "name": "Epiphany",
                        "url": "https://wwww.itschools.co.za/tools/epiphany"
                    },
                    {
                        "id": 131837,
                        "name": "Harmony",
                        "url": "https://wwww.itschools.co.za/tools/hamony"
                    },
                    {
                        "id": 174338,
                        "name": "Zagreb",
                        "url": "https://wwww.itschools.co.za/tools/zagreb"
                    }
                ],
                "url": "https://wwww.itschools.co.za/tools"
            }
        ]

        _this.fetchProjectDetails = fetchProjectDetails;

        _this.filterData = filterData;
        _this.navigate = navigate;


        _this.highlight = function(text, search) {

            var str = text;
            if (!search) {
                return $sce.trustAsHtml(str);
            }
            return $sce.trustAsHtml(str.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
        };

        function showAll(obj) {
            if (obj.target.textContent == 'Projects') {

                _this.showComponent = true;
            } else {

                _this.showComponent = false;

            }

        }

        function navigate(keyCode) {

            if (keyCode == 40) {
                $("#" + _this.data[0].id).removeClass('hlight');
                $("#" + _this.data[1].id).addClass('hlight');
                $(".component").scrollTop(300);

            }
            if (keyCode == 38) {
                $("#" + _this.data[0].id).addClass('hlight');
                $("#" + _this.data[1].id).removeClass('hlight');
                $(".component").scrollTop(0);

            }

        }

        function filterData() {

            if (_this.project == "") {
                _this.filtered = false;
                _this.showGroup = [];
                $('.component').css('height', $(window).height() * 0.7);

            } else {
                var l = $filter('filter')(_this.data, function(item) {

                    if ((item.name.toLowerCase()).indexOf(_this.project) != -1) {
                        if (_this.showGroup.length == 0) _this.showGroup.push(item.name)
                        else {
                            for (var i = 0; i < _this.showGroup.length; i++) {
                                if (_this.showGroup[i] != item.name)
                                    _this.showGroup.push(item.name)
                            }
                        }
                        _this.filtered = true;
                    }
                    for (var j = 0; j < item.groups.length; j++) {
                        var str = (item.groups[j].name).toLowerCase();
                        if (str.indexOf((_this.project).toLowerCase()) != -1) {

                            if (_this.showGroup.length == 0) _this.showGroup.push(item.name)
                            else {
                                for (var i = 0; i < _this.showGroup.length; i++) {
                                    if (_this.showGroup[i] != item.name)
                                        _this.showGroup.push(item.name)
                                }
                            }





                        }
                    }
                    $('.component').css('height', 'auto');

                    _this.filtered = true;
                });
            }

        }


        //calling a service function to get JSON data. 
        function fetchProjectDetails() {
            AppService.ShowLoader();
            var promiseObj = dashBoardService.fetchProjectDetails();
            promiseObj.then(function success(data) {

                    _this.data = data.projectData;

                    AppService.HideLoader();


                },
                function error() {
                    Materialize.toast("Couldn't load data!", 4000, "red")
                });
        }


        //comment this if web server is not there and you want to add JSON Locally
        // fetchProjectDetails();


    }

})();