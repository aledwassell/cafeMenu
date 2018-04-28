(function () {
    'use strict';
    var toybox_app = angular.module('toybox_app', ['ngResource', 'ngRoute'])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    redirectTo: '/'
                })
                .when('/breakfast', {
                    controller: "breakfastCtrl",
                    templateUrl: "views/menu.htm"
                })
                .when('/lunch', {
                    controller: "lunchCtrl",
                    templateUrl: "views/menu.htm"
                })
                .when('/dinner', {
                    controller: "dinnerCtrl",
                    templateUrl: "views/menu.htm"
                })
                .when('/blog', {
                    controller: "blogCtrl",
                    templateUrl: "views/blog.htm"
                })

            $locationProvider.html5Mode(true);
        })
        .factory('flickrSetsProvider', ($resource) => {
            return $resource('/api/sets', {}, {})
        })
        .service('setOrganiser', ['flickrSetsProvider', function (flickrSetsProvider) {
            this.setIds = [
                {
                    name: 'breakfast',
                    id: '72157663434459275'
                },
                {
                    name: 'lunch',
                    id: '72157662802940420'
                },
                {
                    name: 'dinner',
                    id: '72157641632780075'
                }
            ];
            this.getUrls = (setName = []) => {
                if (setName.length === 1) {
                    return flickrSetsProvider.save(this.setIds.find(item => item.name === setName[0]));
                }
            };
        }])

        .controller('navigationCtrl', ['$scope', function ($scope) {
            $scope.links = [
                {url: 'breakfast', name: 'Breakfast', class:'breakfast', ctrl: 'breakfastCtrl', backgroundUrl: ''},
                {url: 'lunch', name: 'Lunch', class:'lunch', ctrl: 'lunchCtrl', backgroundUrl: ''},
                {url: 'dinner', name: 'Dinner', class:'dinner', ctrl: 'dinnerCtrl', backgroundUrl: ''},
                {url: 'blog', name: 'Blog', class:'blog', ctrl: 'blogCtrl'}
            ];
        }])

        .controller('breakfastCtrl', ['$scope', 'setOrganiser', function ($scope, setOrganiser) {
            $scope.set = setOrganiser.getUrls(['breakfast']);
        }])
        .controller('lunchCtrl', ['$scope', 'setOrganiser', function ($scope, setOrganiser) {
            $scope.set = setOrganiser.getUrls(['lunch']);
        }])
        .controller('dinnerCtrl', ['$scope', 'setOrganiser', function ($scope, setOrganiser) {
            $scope.set = setOrganiser.getUrls(['dinner']);
        }])
        .controller('blogCtrl', ['$scope', function ($scope) {
        }])
})();