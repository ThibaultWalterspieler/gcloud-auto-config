'use strict';
const { exec } = require('child_process');
const shellParser = require('node-shell-parser');
const fs = require('fs');
const ini = require('ini');

class Config {
  static get signature() {
    return `ask`;
  }
  static get description() {
    return 'Ask user to select gcp project or other';
  }

  getCgpPath() {
    return new Promise((resolve, reject) => {
      exec(
        'gcloud info --format="get(config.paths.global_config_dir)"',
        (error, stdout, stderr) => {
          if (error) {
            console.warn(error);
          }
          resolve(stdout ? stdout.trim() : stderr);
        }
      );
    });
  }

  async getConfigsList(path) {
    const files = await fs.promises.readdir(path + '/configurations');
    return new Promise((resolve, reject) => {
      resolve(files ? files : []);
    });
  }

  async getMailsList(path) {
    const mails = await fs.promises.readdir(path + '/legacy_credentials');
    return new Promise((resolve, reject) => {
      resolve(mails ? mails : []);
    });
  }

  async getCurrentConfigName(path) {
    return new Promise((resolve, reject) => {
      const currentConfig = fs.readFileSync(`${path}/active_config`, 'utf8');
      resolve(currentConfig ? currentConfig : '');
    });
  }

  async getCurrentConfig(path, configName) {
    return new Promise((resolve, reject) => {
      let currentConfig = ini.parse(
        fs.readFileSync(`${path}/configurations/config_${configName}`, 'utf8')
      );
      resolve(currentConfig ? currentConfig : {});
    });
  }
}

module.exports = Config;
