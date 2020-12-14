#!/usr/bin/env node

import yargs from 'yargs';
import chalk from 'chalk';
import Config from './config';
import Ask from './Ask';
import Table from 'cli-table';

const config = new Config();
const ask = new Ask();

let configData = {
  mails: [],
  configs: [],
  path: '',
  currentConfig: '',
  currentConfigData: {},
};

async function getConfig() {
  const table = new Table({
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
      middle: '│',
    },
  });
  configData = {};
  configData.path = await config.getCgpPath();
  //   console.log(typeof configData.path);
  configData.configs = await config.getConfigsList(configData.path);
  configData.mails = await config.getMailsList(configData.path);
  configData.currentConfig = await config.getCurrentConfigName(configData.path);
  configData.currentConfigData = await config.getCurrentConfig(
    configData.path,
    configData.currentConfig
  );
  //   console.log(configData);
  console.log(`You're current configuration :`);
  table.push(
    ['Account', 'Project', 'Region'],
    [
      configData.currentConfigData.core.account,
      configData.currentConfigData.core.project,
      configData.currentConfigData.compute.region,
    ]
  );
  console.log(table.toString() + '\n');
}

// Get the config files
(async () => {
  await getConfig();
  ask.buildQuestions(configData);
  await ask.askQuestion().then((a) => {
    if (a) {
      getConfig();
    } else {
      throw console.error('Failed');
    }
  });
})();

export default configData;
