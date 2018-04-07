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
