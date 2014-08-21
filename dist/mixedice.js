(function() {
  (function(name) {
    return udefine.configure(function(root) {
      return udefine.inject.add(name);
    });
  })('mixedice');

}).call(this);

(function() {
  var __slice = [].slice;

  udefine('mixedice', function() {
    var mixedice;
    return mixedice = function() {
      var mixFunction, mixObject, p, params, target, _i, _len;
      target = arguments[0], params = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (target == null) {
        return;
      }
      if (params.length === 0) {
        return target;
      }
      mixObject = function(target, obj) {
        var key, splitObject, splitted, value;
        splitObject = function(obj) {
          var directObj, keys, protoObj;
          keys = Object.keys(obj);
          directObj = (function() {
            var key, result, _i, _len;
            result = {};
            for (_i = 0, _len = keys.length; _i < _len; _i++) {
              key = keys[_i];
              result[key] = obj[key];
            }
            return result;
          })();
          protoObj = Object.getPrototypeOf(obj);
          return [directObj, protoObj];
        };
        if (Array.isArray(target)) {
          splitted = splitObject(obj);
          mixObject(target[0], splitted[0]);
          mixObject(target[1], splitted[1]);
        } else {
          for (key in obj) {
            value = obj[key];
            if (!Object.hasOwnProperty.call(target, key)) {
              target[key] = value;
            }
          }
        }
        return null;
      };
      mixFunction = function(target, func) {
        return func.call(target);
      };
      for (_i = 0, _len = params.length; _i < _len; _i++) {
        p = params[_i];
        if (typeof p === 'function') {
          mixFunction(target, p);
        } else {
          mixObject(target, p);
        }
      }
      return target;
    };
  });

  if (udefine.env.commonjs) {
    udefine.require('mixedice', function(mixedice) {
      return module.exports = mixedice;
    });
  }

}).call(this);
