(function () {
    'use strict';
    var toybox_app = angular.module('toybox_app', ['ngResource', 'ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: "main",
                    templateUrl: "views/main.htm"
                })
                .when("/photos", {
                    controller: "photos",
                    templateUrl: "views/photos.htm"
                })
        })
        .factory('flickrPhotosProvider', ($resource) => {
            return $resource('/photos')
        })
        .controller('main', ['$scope', function ($scope) {

        }])
        .controller('navigationCtrl', ['$scope', function ($scope) {
            $scope.links = [
                {url: '#!/photos', name: 'Breakfast', class:'breakfast'},
                {url: '#!/lunch', name: 'Lunch', class:'lunch'},
                {url: '#!/dinner', name: 'Dinner', class:'dinner'},
                {url: '#!/blog', name: 'Blog', class:'blog'},
            ]

        }])
        .controller('mainRepresentationCtrl', ['$scope', 'flickrPhotosProvider', function ($scope, flickrPhotosProvider) {
            $scope.service = flickrPhotosProvider;
            $scope.photosUrls = [];
            let rawData = $scope.service.get({}, () => {
                $scope.$watchCollection('rawData.photos.photo', () => {
                    console.log(rawData.photos.photo);
                });
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
            console.log(rawData)
        }])
})();