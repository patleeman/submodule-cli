#!/usr/bin/env node

// Submodule CLI helpers
// Small CLI utility to help execute git submodule commands

const {exec} = require('child_process');
const {version} = require('./package.json')
const helpMessage = `

Submodule Helper CLI (${version})
A small CLI utility to help manage submodules.

Commands:
    help    List commands
    pull    Recursively checks out master branch and pull and update all submodules
    init    Recursively checks out and initializes all submodules in a project
`;

const argv = require('minimist')(process.argv.slice(2));
console.log('args', argv);
if (argv['_'].length > 0) {
  let cmd = '';
  switch (argv['_'][0]) {
    case 'help':
      console.log(helpMessaxge);
      return;
    case 'init':
    case 'pull':
    case 'update':
      // Recursively pull all submodules in project
      cmd = `git submodule foreach 'git fetch origin --tags; git checkout master; git pull' && git pull && git submodule update --init --recursive`;
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
      console.log(`Submodule executing:\n----------\n\n${stdout}\n${stderr}\n----------\nSubmodule complete.`);
    });
  } else {
    console.error('Invalid command');
  }
} else {
  console.log(helpMessage);
}