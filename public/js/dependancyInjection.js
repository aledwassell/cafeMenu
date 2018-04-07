// var toBeInjected = function (say) {
//     setTimeout(function () {
//         console.info(say);
//     }, 1000);
// }

var mainFunc = function (aGlobalFunc, whatToSay) {
    var whatSay = whatToSay;
    aGlobalFunc(function () {
        console.info(whatSay);
    }, 1000);
}.deb();

mainFunc(setInterval, 'hello world');