(function () {
    'use strict';
    var toybox_app = angular.module('toybox_app', ['ngResource', 'ngRoute', 'rzModule', 'chart.js', 'angularjs-gauge'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: "main",
                    templateUrl: "views/main.htm"
                })
                .when("/weather", {
                    controller: "weatherController",
                    templateUrl: "views/weather.htm"
                })
                .when("/photos", {
                    controller: "photos",
                    templateUrl: "views/photos.htm"
                })
        })
        .factory('data', function ($resource) {
            return $resource('/notes', {}, {
                post: {
                    method: 'POST',
                    isArray: false,
                    id: '@id'
                },
                get: {
                    method: 'GET',
                    isArray: false,
                },
                delete: {
                    method: 'DELETE',
                    isArray: false,
                    id: '@id'
                },
                getAll: {
                    method: 'GET',
                    isArray: false
                }
            })
        })
        .factory('barcodeQuery', ($resource) => {
            return $resource('/querybc/', {}, {
                get: {
                    method: 'GET',
                    isArray: false
                }
            })
        })
        .factory('weatherFactory', ($resource) => {
            return $resource('/weather/:place')
        })
        .factory('flickrPhotosProvider', ($resource) => {
            return $resource('/photos')
        })
        .controller('main', ['$scope', function ($scope) {

        }])
        .controller('navigationCtrl', ['$scope', function ($scope) {
            $scope.links = [
                {url: '/', name: 'Home'},
                {url: '#!/weather', name: 'Weather'},
                {url: '#!/photos', name: 'Photos'}
            ]
        }])
        .controller('weatherController', ['$scope', 'weatherFactory', function ($scope, weatherFactory) {
            $scope.service = weatherFactory;
            $scope.setLoc = '';
            $scope.clear = function () {
                $scope.setLoc = '';
            }

            $scope.getWeather = () => {
                let weather = $scope.service.get({place: `${$scope.setLoc}`}, () => {
                    $scope.weather = weather;
                    $scope.temp = Math.floor(weather.main.temp - 273.15);
                });
            }


        }])
        .controller('dataController', ['$scope', 'data', function ($scope, data) {
            $scope.dataService = data;
            $scope.sendModel = {};
            $scope.deleteModel = {};

            $scope.delete = function () {
                console.log($scope.deleteModel.id)
                $scope.dataService.delete($scope.deleteModel.id);
            }

            $scope.get = function () {
                $scope.dataService.get($scope.sendModel.id);
            }

            $scope.send = function () {
                $scope.dataService.post($scope.sendModel);
            }


        }])
        .controller('photos', ['$scope', 'flickrPhotosProvider', function ($scope, flickrPhotosProvider) {
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
                            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
                            title: photo.title
                        }
                    )
                });
            })
        }])

        .controller('scannerController', ['$scope', 'barcodeQuery', function ($scope, barcodeQuery) {
            $scope.factory = barcodeQuery;
            if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
                // safely access `navigator.mediaDevices.getUserMedia`
                console.log('browser be cool')
                let scanner = {

                    init: function () {
                        Quagga.init(this.state, function (err) {
                            if (err) {
                                console.log('You got an error: ', err);
                                return;
                            }
                            console.log("Initialization finished. Ready to start");
                            Quagga.start();
                        }),
                            Quagga.onDetected((data) => {
                                console.log(data)
                                $scope.factory.get({code: data.codeResult.code})
                            })
                    },
                    state: {
                        inputStream: {
                            name: "Live",
                            type: "LiveStream",
                            constraints: {
                                width: {min: 640},
                                height: {min: 480},
                                facingMode: "environment",
                                aspectRatio: {min: 1, max: 2}
                            },
                            target: document.querySelector('#quaggaTarget')    // Or '#yourElement' (optional)
                        },
                        decoder: {
                            readers: [{
                                format: "ean_reader",
                                config: {
                                    supplements: [
                                        'ean_5_reader', 'ean_2_reader'
                                    ]
                                }
                            }]
                        }
                    }

                };
                scanner.init()
            }

        }])
})();