var myTemplate = require('./helpers.hbs');

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
