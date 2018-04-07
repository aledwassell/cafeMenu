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
