var Car = function (loc) {
    this.loc = loc;
};
Car.prototype.move = function () {
    this.loc++;
};

var Van = function (loc) {
    return new Car(loc);
    //Car.call(this, loc);
};
Van.prototype = Object.create(Car.prototype);
Van.prototype.constructor = Van;
module.exports = {
    Car,
    Van,
};