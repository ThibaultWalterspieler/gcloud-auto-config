'use strict';
import configData from './index';
import inquirer from 'inquirer';
import Gcp from './gcp';

const gcp = new Gcp();

export default class Ask {
  static get signature() {
    return `ask`;
  }
  static get description() {
    return 'Ask user to select gcp project or other';
  }

  questions = [];

  buildQuestions(config) {
    this.questions = [
      {
        type: 'list',
        name: 'Project',
        message: 'Which project do you want to set ?',
        choices: [],
        filter: function(val) {
          return val.toLowerCase();
        },
      },
    ];
    config.configs.forEach((c) => {
      c = c.replace('config_', '');
      this.questions[0].choices.push(c);
    });
    this.questions[0].choices.push('Create new configuration');
    this.questions[0].choices.push('Exit');
  }
  askQuestion() {
    return new Promise((resolve, reject) => {
      inquirer.prompt(this.questions).then((answer) => {
        // answer = JSON.stringify(answer, null, '  ');

        if (answer.Project === 'exit') {
          process.on('exit', function(code) {
            return console.log(`\nBye bye 👋`);
          });
        } else if (answer.Project === 'create new configuration') {
          gcp.gcpCreateConfig(configData.mails);
          const mailQuestion = [
            {
              type: 'list',
              name: 'Mail',
              message: 'Which mail do you want to use ?',
              choices: [],
              filter: function(val) {
                return val.toLowerCase();
              },
            },
          ];
          configData.mails.forEach((e) => {
            mailQuestion[0].choices.push(e);
          });
          console.log(mailQuestion);
          inquirer.prompt(mailQuestion).then((answer) => {
            console.log(answer);
          });
        } else {
          gcp.gcpSelectConfig(answer.Project).then((a) => console.log(a));
        }

        resolve(true);
        reject(false);
      });
    });
  }
}
