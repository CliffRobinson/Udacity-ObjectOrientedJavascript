var move = function() {
    this.loc++;
};

var carlike = function(obj, loc) {
    obj.loc = loc;
    obj.move = move;
    return obj;
};

module.exports = {
    carlike
}