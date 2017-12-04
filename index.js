#!/usr/bin/env node

// Submodule CLI helpers
// Small CLI utility to help execute git submodule commands

const {exec} = require('child_process');
const {version} = require('./package.json')
const helpMessage = `
Submodule CLI (${version})
Git submodule helper

Commands:
    pull    Recursively checks out master branch and pull and update all submodules
    init    Recursively checks out and initializes all submodules in a project
    fetch   Recursively fetches all new changes in submodules but does not pull or update.
    status  Executes 'git submodule status'
    help    List commands
`;

const argv = require('minimist')(process.argv.slice(2));

if (argv['_'].length > 0) {
  let cmd = '';
  switch (argv['_'][0]) {
    case 'help':
      console.log(helpMessage);
      return;
    case 'init':
    case 'pull':
      // Recursively pull all submodules in project
      cmd = `git submodule foreach 'git fetch origin --tags; git checkout master; git pull' && git pull && git submodule update --init --recursive`;
      break;
    case 'fetch':
      cmd = `git submodule foreach 'git fetch origin --tags;'`;
      break;
    case 'status':
      cmd = `git submodule status`;
      break;
    default:
      console.log(helpMessage);
  }

  if (cmd) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`\n--------------------\n\n${stdout}\n${stderr}\n--------------------\n`);
    });
  } else {
    console.error('Invalid command');
  }
} else {
  console.log(helpMessage);
}