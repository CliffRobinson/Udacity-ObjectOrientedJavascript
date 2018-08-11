var carlike = function(obj, loc) {
    obj.loc = loc;
    obj.move = function() {
        loc++;
    };
    return obj;
};

module.exports = {
    carlike
}