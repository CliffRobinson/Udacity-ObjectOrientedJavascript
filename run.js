const {carlike, move} = require('./library')

let mike = carlike({}, 17)
mike.move()
console.log(mike);

var amy = carlike({}, 1);
amy.move();
var ben = carlike({}, 9);
ben.move();