"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _executioner = _interopRequireDefault(require("executioner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var errors = {
  noInstantiate: new TypeError('This class should not be instantiated.'),
  missingMethods: new TypeError('This class does not implement the required methods.'),
  calledSuperMethod: new TypeError('This method has not been overridden by the child class.')
};

var Installer =
/*#__PURE__*/
function () {
  function Installer() {
    _classCallCheck(this, Installer);

    if (this.constructor === Installer) {
      throw errors.noInstantiate;
    }
  }

  _createClass(Installer, [{
    key: "install",
    value: function install(packages) {
      var _this = this;

      if (!this.shouldRun) {
        return;
      }

      var options = _objectSpread({
        node: process.argv[0],
        packages: packages.map(function (pkg) {
          return "\"".concat(pkg, "\"");
        }).join(' ')
      }, this.args);

      return new Promise(function (resolve, reject) {
        (0, _executioner.default)(_this.command, options, function (error, result) {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        });
      });
    }
  }, {
    key: "shouldRun",
    get: function get() {
      throw errors.calledSuperMethod;
    }
  }, {
    key: "name",
    get: function get() {
      throw errors.calledSuperMethod;
    }
  }, {
    key: "command",
    get: function get() {
      throw errors.calledSuperMethod;
    }
  }, {
    key: "args",
    get: function get() {
      throw errors.calledSuperMethod;
    }
  }]);

  return Installer;
}();

exports.default = Installer;