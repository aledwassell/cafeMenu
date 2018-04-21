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
                    templateUrl: "views/breakfast.htm"
                })
                .when('/lunch', {
                    controller: "lunchCtrl",
                    templateUrl: "views/lunch.htm"
                })
                .when('/dinner', {
                    controller: "dinnerCtrl",
                    templateUrl: "views/dinner.htm"
                })
                .when('/blog', {
                    controller: "blogCtrl",
                    templateUrl: "views/blog.htm"
                })

            $locationProvider.html5Mode(true);
        })
        .factory('flickrPhotosProvider', ($resource) => {
            return $resource('/api/photos')
        })
        .factory('flickrSetsProvider', ($resource) => {
            return $resource('/api/sets', {}, {
                get:{
                    method: 'GET',
                    isTypedArray: false,
                    id: '@id'
                }
            })
        })
        .service('breakfastPhotos', ['flickrPhotosProvider', function (flickrPhotosProvider) {
            const provider = flickrPhotosProvider
            this.photos = provider.get()
        }])
        .service('URLbuilder', ['flickrPhotosProvider', function (flickrPhotosProvider) {
            this.photoURLs = [];
            this.getRawResponse = flickrPhotosProvider.get({}, () => {
                angular.forEach(this.getRawResponse.photos.photo, (photo) => {
                    this.photoURLs.push(
                        {
                            id: photo.id,
                            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`,
                            title: photo.title,
                            description: photo.description,
                            author: photo.author
                        }
                    )
                });
            })
            this.getUrls = function () {
                return this.photoURLs;
            }
        }])

        .service('setOrganiser', ['flickrSetsProvider', function (flickrSetsProvider) {
            this.setIds = [
                {
                    name: 'breakfast',
                    id: ''
                },
                {
                    name: 'lunch',
                    id: ''
                },
                {
                    name: 'dinner',
                    id: ''
                }
            ];
            this.getRawResponse = flickrSetsProvider.get({}, () => {
            })
        }])

        .controller('navigationCtrl', ['$scope', 'URLbuilder', function ($scope, URLbuilder) {
            $scope.images = URLbuilder.getUrls();
            $scope.links = [
                {url: 'breakfast', name: 'Breakfast', class:'breakfast', ctrl: 'breakfastCtrl'},
                {url: 'lunch', name: 'Lunch', class:'lunch', ctrl: 'lunchCtrl'},
                {url: 'dinner', name: 'Dinner', class:'dinner', ctrl: 'dinnerCtrl'},
                {url: 'blog', name: 'Blog', class:'blog', ctrl: 'blogCtrl'}
            ];
        }])

        .controller('breakfastCtrl', ['$scope', 'URLbuilder', function ($scope, URLbuilder) {
            $scope.active = false;
            $scope.getPhotos = function () {
                $scope.photosUrls = URLbuilder.getUrls();
                $scope.active = !$scope.active;
                console.log($scope.active);
            }
        }])
        .controller('lunchCtrl', ['$scope', 'URLbuilder', function ($scope, URLbuilder) {
            $scope.active = false;
            $scope.getPhotos = function () {
                $scope.photosUrls = URLbuilder.getUrls();
                $scope.active = !$scope.active;
                console.log($scope.active);
            }
        }])
        .controller('dinnerCtrl', ['$scope', 'URLbuilder', function ($scope, URLbuilder) {
            $scope.active = false;
            $scope.getPhotos = function () {
                $scope.photosUrls = URLbuilder.getUrls();
                $scope.active = !$scope.active;
                console.log($scope.active);
            }
        }])
        .controller('blogCtrl', ['$scope', function ($scope) {
            $scope.active = false;
            $scope.getPhotos = function () {
                $scope.photosUrls = URLbuilder.getUrls();
                $scope.active = !$scope.active;
                console.log($scope.active);
            }
        }])
})();