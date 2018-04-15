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
            return $resource('/')
        })
        .service('breakfastPhotos', ['flickrPhotosProvider', function (flickrPhotosProvider) {
            const provider = flickrPhotosProvider
            this.photos = provider.get()
        }])
        .service('photoPanelConstructor', ['flickrPhotosProvider', function (flickrPhotosProvider) {
            let provider = flickrPhotosProvider,
                panel = {};

            function PanelConstructor(pasedInfo) {
                this.title = pasedInfo.title;
                this.backgroundImage = pasedInfo.backgroundImage;
            }


        }])

        .service('URLbuilder', ['flickrPhotosProvider', function (flickrPhotosProvider) {
            let rawData = flickrPhotosProvider.get({}, () => {
                angular.forEach(rawData.photos.photo, (photo) => {
                    $scope.photosUrls.push(
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
        }])

        .controller('navigationCtrl', ['$scope', function ($scope) {
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
        .controller('breakfastCtrl', ['$scope', function ($scope) {
            $scope.test = 'breakfast';
        }])
        .controller('lunchCtrl', ['$scope', function ($scope) {
            $scope.test = 'lunch';
        }])
        .controller('dinnerCtrl', ['$scope', function ($scope) {
            $scope.test = 'dinner';
        }])
        .controller('blogCtrl', ['$scope', function ($scope) {
            $scope.test = 'blog';
        }])
})();