'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _child_process = require("child_process");

var _fs = _interopRequireDefault(require("fs"));

var _ini = _interopRequireDefault(require("ini"));

var Config = /*#__PURE__*/function () {
  function Config() {
    (0, _classCallCheck2["default"])(this, Config);
  }

  (0, _createClass2["default"])(Config, [{
    key: "getCgpPath",
    value: function getCgpPath() {
      return new Promise(function (resolve, reject) {
        (0, _child_process.exec)('gcloud info --format="get(config.paths.global_config_dir)"', function (error, stdout, stderr) {
          if (error) {
            console.warn(error);
          }

          resolve(stdout ? stdout.trim() : stderr);
        });
      });
    }
  }, {
    key: "getConfigsList",
    value: function () {
      var _getConfigsList = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(path) {
        var files;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _fs["default"].promises.readdir(path + '/configurations');

              case 2:
                files = _context.sent;
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  resolve(files ? files : []);
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getConfigsList(_x) {
        return _getConfigsList.apply(this, arguments);
      }

      return getConfigsList;
    }()
  }, {
    key: "getMailsList",
    value: function () {
      var _getMailsList = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(path) {
        var mails;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _fs["default"].promises.readdir(path + '/legacy_credentials');

              case 2:
                mails = _context2.sent;
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  resolve(mails ? mails : []);
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getMailsList(_x2) {
        return _getMailsList.apply(this, arguments);
      }

      return getMailsList;
    }()
  }, {
    key: "getCurrentConfigName",
    value: function () {
      var _getCurrentConfigName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(path) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function (resolve, reject) {
                  var currentConfig = _fs["default"].readFileSync("".concat(path, "/active_config"), 'utf8');

                  resolve(currentConfig ? currentConfig : '');
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getCurrentConfigName(_x3) {
        return _getCurrentConfigName.apply(this, arguments);
      }

      return getCurrentConfigName;
    }()
  }, {
    key: "getCurrentConfig",
    value: function () {
      var _getCurrentConfig = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(path, configName) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", new Promise(function (resolve, reject) {
                  var currentConfig = _ini["default"].parse(_fs["default"].readFileSync("".concat(path, "/configurations/config_").concat(configName), 'utf8'));

                  resolve(currentConfig ? currentConfig : {});
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getCurrentConfig(_x4, _x5) {
        return _getCurrentConfig.apply(this, arguments);
      }

      return getCurrentConfig;
    }()
  }], [{
    key: "signature",
    get: function get() {
      return "config";
    }
  }, {
    key: "description",
    get: function get() {
      return 'Get GCP config of the user';
    }
  }]);
  return Config;
}();

module.exports = Config;