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
                    templateUrl: "views/breakfast.htm",
                    resolve: {
                        images: function (URLbuilder) {
                            return URLbuilder.getUrls();
                        }
                    }
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
            return $resource('/api/photos', {id:@id}, {
                get:{
                    method: 'GET',
                    id: id
                }
            })
        })
        .factory('flickrSetsProvider', ($resource) => {
            return $resource('/api/sets')
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
            this.photoURLs = [];
            this.getRawResponse = flickrSetsProvider.get({id:'72157663434459275'}, () => {
                this.photoURLs = this.getRawResponse;
                console.log(this.getRawResponse);
            })
            this.getUrls = function () {
                return this.photoURLs;
            }
        }])

        .controller('navigationCtrl', ['$scope', 'URLbuilder', function ($scope, URLbuilder) {
            $scope.images = URLbuilder.getUrls();
            $scope.links = [
                {url: 'breakfast', name: 'Breakfast', class:'breakfast', backgroundImage: "https://farm5.staticflickr.com/4649/39644383782_a927073153_m.jpg"},
                {url: 'lunch', name: 'Lunch', class:'lunch'},
                {url: 'dinner', name: 'Dinner', class:'dinner'},
                {url: 'blog', name: 'Blog', class:'blog'},
            ]

            console.log($scope.images);

        }])
        .controller('mainRepresentationCtrl', ['$scope', 'flickrPhotosProvider', function ($scope, flickrPhotosProvider) {
            $scope.service = flickrPhotosProvider;
            $scope.photosUrls = [];
            $scope.test = 'hello';
        }])
        .controller('breakfastCtrl', ['$scope', 'URLbuilder', function ($scope, URLbuilder) {
            $scope.photosUrls = URLbuilder.getUrls();
        }])
        .controller('lunchCtrl', ['$scope', 'URLbuilder', function ($scope, URLbuilder) {
            $scope.test = 'lunch';
            $scope.photosUrls = URLbuilder.getUrls();
            console.log($scope.photosUrls)
        }])
        .controller('dinnerCtrl', ['$scope', 'setOrganiser', function ($scope, setOrganiser) {
            $scope.service = setOrganiser;
            $scope.service.getUrls();
            $scope.test = 'dinner';
        }])
        .controller('blogCtrl', ['$scope', function ($scope) {
            $scope.test = 'blog';
        }])
})();