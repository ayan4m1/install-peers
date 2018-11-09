"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var environmentVariable = 'INSTALLING_PEERS';

var Locker =
/*#__PURE__*/
function () {
  function Locker() {
    _classCallCheck(this, Locker);
  }

  _createClass(Locker, null, [{
    key: "claim",
    value: function claim() {
      if (process.env[environmentVariable]) {
        return false;
      }

      process.env[environmentVariable] = 1;
      return true;
    }
  }, {
    key: "release",
    value: function release() {
      delete process.env[environmentVariable];
    }
  }]);

  return Locker;
}();

exports.default = Locker;