#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _yargs = _interopRequireDefault(require("yargs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _config = _interopRequireDefault(require("./config"));

var _Ask = _interopRequireDefault(require("./Ask"));

var _cliTable = _interopRequireDefault(require("cli-table"));

var config = new _config["default"]();
var ask = new _Ask["default"]();
var configData = {
  mails: [],
  configs: [],
  path: '',
  currentConfig: '',
  currentConfigData: {}
};

function getConfig() {
  return _getConfig.apply(this, arguments);
} // Get the config files


function _getConfig() {
  _getConfig = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var table;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            table = new _cliTable["default"]({
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
            configData = {};
            _context2.next = 4;
            return config.getCgpPath();

          case 4:
            configData.path = _context2.sent;
            _context2.next = 7;
            return config.getConfigsList(configData.path);

          case 7:
            configData.configs = _context2.sent;
            _context2.next = 10;
            return config.getMailsList(configData.path);

          case 10:
            configData.mails = _context2.sent;
            _context2.next = 13;
            return config.getCurrentConfigName(configData.path);

          case 13:
            configData.currentConfig = _context2.sent;
            _context2.next = 16;
            return config.getCurrentConfig(configData.path, configData.currentConfig);

          case 16:
            configData.currentConfigData = _context2.sent;
            //   console.log(configData);
            console.log("You're current configuration :");
            table.push(['Account', 'Project', 'Region'], [configData.currentConfigData.core.account, configData.currentConfigData.core.project, configData.currentConfigData.compute.region]);
            console.log(table.toString() + '\n');

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getConfig.apply(this, arguments);
}

(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getConfig();

        case 2:
          ask.buildQuestions(configData);
          _context.next = 5;
          return ask.askQuestion().then(function (a) {
            if (a) {
              getConfig();
            } else {
              throw console.error('Failed');
            }
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();
var _default = configData;
exports["default"] = _default;