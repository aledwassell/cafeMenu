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
