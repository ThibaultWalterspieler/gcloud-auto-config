"use strict";
'user strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _child_process = require("child_process");

var _cliTable = _interopRequireDefault(require("cli-table"));

var Gcp = /*#__PURE__*/function () {
  function Gcp() {
    (0, _classCallCheck2["default"])(this, Gcp);
  }

  (0, _createClass2["default"])(Gcp, [{
    key: "gcpSelectConfig",
    value: function gcpSelectConfig(env) {
      return new Promise(function (resolve, reject) {
        (0, _child_process.exec)("gcloud config configurations activate ".concat(env), function (error, stdout, stderr) {
          if (error) {
            console.warn(error);
          }

          resolve(stdout ? stdout.trim() : stderr);
        });
      });
    }
  }, {
    key: "gcpCreateConfig",
    value: function gcpCreateConfig(emails) {
      var table = new _cliTable["default"]({
        chars: {
          top: '═',
          'top-mid': '╤',
          'top-left': '╔',
          'top-right': '╗',
          bottom: '═',
          'bottom-mid': '╧',
          'bottom-left': '╚',
          'bottom-right': '╝',
          left: '║',
          'left-mid': '╟',
          mid: '─',
          'mid-mid': '┼',
          right: '║',
          'right-mid': '╢',
          middle: '│'
        }
      });
      table.push(['Emails']);
      emails.forEach(function (email) {
        table.push([email]);
      });
      console.log("Emails available :");
      console.log(table.toString() + '\n');
      return new Promise(function (resolve, reject) {});
    }
  }], [{
    key: "signature",
    get: function get() {
      return "gcp";
    }
  }, {
    key: "description",
    get: function get() {
      return 'Ask user to select gcp project or other';
    }
  }]);
  return Gcp;
}();

exports["default"] = Gcp;