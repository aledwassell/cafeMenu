(function () {
    'use strict'
    var element = document.getElementById('light')
    document.addEventListener('devicelight', function (e) {
        console.log(e.value);
        // element.appendChild(`<p>${e.value}</p>`);
        document.body.style.backgroundColor = "red";
    })
    document.body.style.backgroundColor = "blue";

})();