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
        .factory('testGet', ($resource) => {
            return $resource('/api/hello', {}, {
                post:{
                    method: 'POST',
                    isArray: true
                }
            });
        })
        .factory('flickrSetsProvider', ($resource) => {
            return $resource('/api/sets', {}, {})
        })
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
            let photoURLs = [];
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
                if(setName.length > 1)
                    console.log(setName)
                //call egt sets for the length of setname
                else if (setName.length === 1)
                    console.log(setName)
                    //call egt sets once
                return this.setIds.filter((set) => {
                    if(set.name === setName){
                        return set;
                    } else {
                        return null;
                    }
                })
            };
            this.getRawResponse = flickrSetsProvider.save()
                .$promise.then(function(data) {
                    console.log(data)
                    angular.forEach(data.photoset.photo, (photo) => {
                        photoURLs.push(
                            {
                                id: photo.id,
                                url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`,
                                title: photo.title,
                                description: photo.description,
                                author: photo.author
                            }
                        )
                    })
            }).then(() => {
                console.log(photoURLs);
            })
        }])

        .controller('navigationCtrl', ['$scope', 'setOrganiser', function ($scope, setOrganiser) {
            $scope.images = setOrganiser.getUrls(['cheese']);
            $scope.images = setOrganiser.getUrls(['cheese', 'butter', 'Ham']);
            $scope.links = [
                {url: 'breakfast', name: 'Breakfast', class:'breakfast', ctrl: 'breakfastCtrl'},
                {url: 'lunch', name: 'Lunch', class:'lunch', ctrl: 'lunchCtrl'},
                {url: 'dinner', name: 'Dinner', class:'dinner', ctrl: 'dinnerCtrl'},
                {url: 'blog', name: 'Blog', class:'blog', ctrl: 'blogCtrl'}
            ];
        }])

        .controller('breakfastCtrl', ['$scope', 'URLbuilder', 'setOrganiser', function ($scope, URLbuilder, setOrganiser) {
            $scope.setConfig = setOrganiser.getSetId('breakfast');
            // $scope.photosUrls = URLbuilder.getUrls();

        }])
        .controller('lunchCtrl', ['$scope', 'URLbuilder', 'setOrganiser', function ($scope, URLbuilder, setOrganiser) {
            $scope.setConfig = setOrganiser.getSetId('lunch');
            $scope.photosUrls = URLbuilder.getUrls();
        }])
        .controller('dinnerCtrl', ['$scope', 'URLbuilder', 'setOrganiser', function ($scope, URLbuilder, setOrganiser) {
            $scope.setConfig = setOrganiser.getSetId('dinner');
            $scope.photosUrls = URLbuilder.getUrls();
        }])
        .controller('blogCtrl', ['$scope', function ($scope) {
            $scope.photosUrls = URLbuilder.getUrls();
        }])
})();