(function () {
    'use strict';
    let toybox_app = angular.module('toybox_app', ['ngResource', 'ngRoute', 'angular-carousel'])
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
                    id: '72157690477770340'
                },
                {
                    name: 'lunch',
                    id: '72157695562701554'
                },
                {
                    name: 'dinner',
                    id: '72157690477773410'
                }
            ];
            this.getUrls = (setName = []) => {
                if (setName.length === 1) {
                    return flickrSetsProvider.save(this.setIds.find(item => item.name === setName[0]));
                }
            };
        }])

        .controller('navigationCtrl', ['$scope', '$q', 'setOrganiser', function ($scope, $q, setOrganiser) {
            $scope.toggleFocus = function () {
                let main = angular.element( document.getElementsByClassName( 'wrapper-container' ) );
                main.addClass('food-focus');
            }
            //
            // $scope.breakfastBackground = setOrganiser.getUrls(['breakfast']);
            // $scope.lunchBackground = setOrganiser.getUrls(['dinner']);
            // $scope.dinnerBackground = setOrganiser.getUrls(['dinner']);
            // $q.all([
            //     $scope.breakfastBackground.$promise,
            //     $scope.lunchBackground.$promise,
            //     $scope.dinnerBackground.$promise
            // ]).then(function() {
                $scope.links = [
                    {
                        id: 1,
                        url: 'breakfast',
                        name: 'Breakfast',
                        class:'breakfast',
                        ctrl: 'breakfastCtrl',
                        // background: $scope.breakfastBackground.photoset.photo["0"].url_m
                    },
                    {
                        id: 2,
                        url: 'lunch',
                        name: 'Lunch',
                        class:'lunch',
                        ctrl: 'lunchCtrl',
                        // background: $scope.lunchBackground.photoset.photo["0"].url_m
                    },
                    {
                        id: 3,
                        url: 'dinner',
                        name: 'Dinner',
                        class:'dinner',
                        ctrl: 'dinnerCtrl',
                        // background: $scope.dinnerBackground.photoset.photo["0"].url_m
                    },
                    {
                        id: 4,
                        url: 'blog',
                        name: 'Blog',
                        class:'blog',
                        ctrl: 'blogCtrl'}
                ];
            // });

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