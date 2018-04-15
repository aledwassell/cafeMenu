(function () {
    'use strict';
    var toybox_app = angular.module('toybox_app', ['ngResource', 'ngRoute'])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    redirectTo: '/breakfast'
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

            $locationProvider.html5Mode(true).hashPrefix('!');
        })
        .factory('flickrPhotosProvider', ($resource) => {
            return $resource('/photos')
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
                            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`,
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

        .controller('navigationCtrl', ['$scope', 'URLbuilder', function ($scope, URLbuilder) {
            $scope.background = URLbuilder.getUrls();
            $scope.links = [
                {url: 'breakfast', name: 'Breakfast', class:'breakfast'},
                {url: 'lunch', name: 'Lunch', class:'lunch'},
                {url: 'dinner', name: 'Dinner', class:'dinner'},
                {url: 'blog', name: 'Blog', class:'blog'},
            ]

        }])
        .controller('mainRepresentationCtrl', ['$scope', 'flickrPhotosProvider', function ($scope, flickrPhotosProvider) {
            $scope.service = flickrPhotosProvider;
            $scope.photosUrls = [];
            $scope.test = 'hello';
        }])
        .controller('breakfastCtrl', ['$scope', 'URLbuilder', function ($scope, URLbuilder) {

        }])
        .controller('lunchCtrl', ['$scope', 'URLbuilder', function ($scope, URLbuilder) {
            $scope.test = 'lunch';
            $scope.photosUrls = URLbuilder.getUrls();
        }])
        .controller('dinnerCtrl', ['$scope', function ($scope) {
            $scope.test = 'dinner';
        }])
        .controller('blogCtrl', ['$scope', function ($scope) {
            $scope.test = 'blog';
        }])
})();