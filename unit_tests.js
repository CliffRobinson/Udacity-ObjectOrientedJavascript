describe("TEST: A new carlike object should have a move method.", function() {
    it("\nA new carlike can move: ", function() {
        expect(carlike({}, 1)).to.respondTo('move');
    });
  });
  
  describe("TEST: amy should have moved from 1 to 2.", function() {
    it("\nAmy moved from 1 to 2: ", function() {
      amy.loc.should.be.equal(2);
    });
  });
  
  describe("TEST: ben should have moved from 9 to 10.", function() {
    it("\nBen moved from 9 to 10: ", function() {
      ben.loc.should.be.equal(10);
    });
  });

  /*
This try catch block is just here because Karma has limitations.
Seriously, if you run
expect(someVar).to.not.exist
and someVar doesn't exist, it spits out a referenceError
instead of passing the test, which is checking to make sure
it doesn't exist.
*/

try {
    move.toString();
} catch (err) {
    var move = undefined;
}

describe("TEST: move should not be a global variable.", function() {
    it("move is not in the global scope: ", function() {
        expect(move).to.not.exist;
    });
});

var containsString = function(string, substring) {
    if (string.search(substring) > -1) {
        return true;
    } else {
        return false;
    }
};

describe("TEST: move should not use 'this'.", function() {
    it("move does not use 'this': ", function() {
        expect(containsString(carlike.toString(), 'this')).to.be.false;
    });
});