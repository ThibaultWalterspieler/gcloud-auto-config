'user strict';
import { exec } from 'child_process';
import Table from 'cli-table';

export default class Gcp {
  static get signature() {
    return `gcp`;
  }
  static get description() {
    return 'Ask user to select gcp project or other';
  }

  gcpSelectConfig(env) {
    return new Promise((resolve, reject) => {
      exec(
        `gcloud config configurations activate ${env}`,
        (error, stdout, stderr) => {
          if (error) {
            console.warn(error);
          }
          resolve(stdout ? stdout.trim() : stderr);
        }
      );
    });
  }

  gcpCreateConfig(emails) {
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
    table.push(['Emails']);
    emails.forEach((email) => {
      table.push([email]);
    });
    console.log(`Emails available :`);
    console.log(table.toString() + '\n');
    return new Promise((resolve, reject) => {});
  }
}
