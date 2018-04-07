
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
