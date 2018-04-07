module.exports = function(birthYear){
  let age = new Date().getFullYear() - birthYear;
  if (age <= 1 && age > 0){
    return "Less that a year old";
  } else if (age < 0) {
    return "Hasn't been born yet"
  } else {
    return age + ' years old';
  }
};
