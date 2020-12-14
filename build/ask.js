'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = _interopRequireDefault(require("./index"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _gcp = _interopRequireDefault(require("./gcp"));

var gcp = new _gcp["default"]();

var Ask = /*#__PURE__*/function () {
  function Ask() {
    (0, _classCallCheck2["default"])(this, Ask);
    this.questions = [];
  }

  (0, _createClass2["default"])(Ask, [{
    key: "buildQuestions",
    value: function buildQuestions(config) {
      var _this = this;

      this.questions = [{
        type: 'list',
        name: 'Project',
        message: 'Which project do you want to set ?',
        choices: [],
        filter: function filter(val) {
          return val.toLowerCase();
        }
      }];
      config.configs.forEach(function (c) {
        c = c.replace('config_', '');

        _this.questions[0].choices.push(c);
      });
      this.questions[0].choices.push('Create new configuration');
      this.questions[0].choices.push('Exit');
    }
  }, {
    key: "askQuestion",
    value: function askQuestion() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _inquirer["default"].prompt(_this2.questions).then(function (answer) {
          // answer = JSON.stringify(answer, null, '  ');
          if (answer.Project === 'exit') {
            process.on('exit', function (code) {
              return console.log("\nBye bye \uD83D\uDC4B");
            });
          } else if (answer.Project === 'create new configuration') {
            gcp.gcpCreateConfig(_index["default"].mails);
            var mailQuestion = [{
              type: 'list',
              name: 'Mail',
              message: 'Which mail do you want to use ?',
              choices: [],
              filter: function filter(val) {
                return val.toLowerCase();
              }
            }];

            _index["default"].mails.forEach(function (e) {
              mailQuestion[0].choices.push(e);
            });

            console.log(mailQuestion);

            _inquirer["default"].prompt(mailQuestion).then(function (answer) {
              console.log(answer);
            });
          } else {
            gcp.gcpSelectConfig(answer.Project).then(function (a) {
              return console.log(a);
            });
          }

          resolve(true);
          reject(false);
        });
      });
    }
  }], [{
    key: "signature",
    get: function get() {
      return "ask";
    }
  }, {
    key: "description",
    get: function get() {
      return 'Ask user to select gcp project or other';
    }
  }]);
  return Ask;
}();

exports["default"] = Ask;