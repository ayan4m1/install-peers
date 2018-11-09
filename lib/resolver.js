"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var errors = {
  noInstantiate: new TypeError('This class should not be instantiated.'),
  missingMethods: new TypeError('This class does not implement the required methods.'),
  calledSuperMethod: new TypeError('This method has not been overridden by the child class.')
};

var Resolver =
/*#__PURE__*/
function () {
  function Resolver() {
    _classCallCheck(this, Resolver);

    if (this.constructor === Resolver) {
      throw errors.noInstantiate;
    }

    if (this.packages === Resolver.prototype.packages) {
      throw errors.missingMethods;
    }
  }

  _createClass(Resolver, [{
    key: "packages",
    value: function packages() {
      throw errors.calledSuperMethod;
    }
  }]);

  return Resolver;
}();

exports.default = Resolver;