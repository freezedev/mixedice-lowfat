(function() {
  var expect, mixedice;

  require('udefine/global');

  mixedice = require('../dist/mixedice');

  expect = require('chai').expect;

  describe('mixedice', function() {
    it('empty parameters', function() {
      var result;
      result = mixedice();
      expect(result).to.be.a('undefined');
      return expect(result).to.equal(void 0);
    });
    it('mixing in two objects', function() {
      var obj1, obj2, result;
      obj1 = {
        a: 4
      };
      obj2 = {
        b: 'test'
      };
      result = mixedice(obj1, obj2);
      expect(result).to.be.a('object');
      return expect(result).to.deep.equal({
        a: 4,
        b: 'test'
      });
    });
    return it('mixing in constructor functions', function() {
      var First, Second, second;
      First = (function() {
        function First(prop) {
          this.prop = prop != null ? prop : 5;
        }

        First.prototype.yellow = function() {
          return 'yellow';
        };

        return First;

      })();
      Second = (function() {
        function Second() {
          mixedice([this, Second.prototype], new First());
        }

        Second.prototype.a = function() {};

        return Second;

      })();
      second = new Second();
      expect(second).to.be.a('object');
      expect(second).to.be.a["instanceof"](Second);
      expect(Second).to.be.a('function');
      expect(second.prop).to.be.a('number');
      expect(second.prop).to.equal(5);
      expect(Second.prototype.yellow).to.be.a('function');
      expect(second.yellow()).to.be.a('string');
      return expect(second.yellow()).to.equal('yellow');
    });
  });

}).call(this);
