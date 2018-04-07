/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var myTemplate = __webpack_require__(5);

fetch('https://raw.githubusercontent.com/aledwassell/jason_data/master/sheep.json')
  .then((result) => {
    return result.json()
  }).then((data) => {
    createHTML(data);
  });

function createHTML(data) {
  let midPoint = Math.floor(data.sheep.length / 2);
  data.sheep.splice(midPoint, 0, data.heading);

  let container = document.getElementById('target');

  container.innerHTML = myTemplate(data);
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function() {  

  const gbp = [20, 40, 60];

  const usd = gbp.map(eachAmount => eachAmount * 1.24);

  console.log(usd);

  const euros = [29.76, 41.85, 46.5];

  const sum = euros.reduce((total, amount) => total + amount, 0);
  const above30 = euros.filter(euro => euro >= 30);
  console.log(above30);
  console.log(sum);

}());


/***/ }),
/* 2 */
/***/ (function(module, exports) {

(function() {


  function saySomething() {
    console.log('Hello Aled from pass to fn');
  };

  function callSaySomething(fn) {
    fn();
  }

  callSaySomething(saySomething);

  const makeHi = () => {
    console.log('I am saying hi from pass to fn');
  }

  callSaySomething(makeHi);

}());


/***/ }),
/* 3 */
/***/ (function(module, exports) {


  (function() {


  const api = 'http://api.giphy.com/v1/gifs/search?q=cats&api_key=dc6zaTOxFJmzC';
  const myImg = document.createElement('IMG');
  document.body.appendChild(myImg);

  fetch(api).then((result) => {
    return result.json();
  }).then((data) => {
    console.log(data);
    myImg.src = data.data[3].images.fixed_height.url;
  });

}());


/***/ }),
/* 4 */
/***/ (function(module, exports) {

(function() {


  let data = [];
  let val = 0;
  while(data.length < 1000000){
    val++;
    data.push(val);
  };
  console.time('filterMap');

  const filterMap = data.filter((value) => {return value % 2}).map((value) => {return value * 2});

  console.timeEnd('filterMap');

  console.time('reducer');
  const reducer = data.reduce((acc, value) => {
    if (value % 2 === 0) {
      acc.push(value * 2)
    }
    return acc;
  }, []);

  console.timeEnd('reducer');

}());


/***/ }),
/* 5 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/pc-user/sandbox/toybox/js/helpers.hbs Unexpected character '#' (1:2)\nYou may need an appropriate loader to handle this file type.\n| {{#each sheep}}\n|   <div class=\"helvetica ma3\">\n|     <div>");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(0);


/***/ })
/******/ ]);