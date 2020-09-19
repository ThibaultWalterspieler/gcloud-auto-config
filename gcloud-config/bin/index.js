#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');
const Config = require('./config');

const config = new Config();

const configData = {
  mails: [],
  configs: [],
  path: '',
  currentConfig: '',
  currentConfigData: {},
};

(async () => {
  configData.path = await config.getCgpPath();
  //   console.log(typeof configData.path);
  configData.configs = await config.getConfigsList(configData.path);
  configData.mails = await config.getMailsList(configData.path);
  configData.currentConfig = await config.getCurrentConfigName(configData.path);
  configData.currentConfigData = await config.getCurrentConfig(
    configData.path,
    configData.currentConfig
  );
  console.log(configData);
})();
