#!/usr/bin/env node
import program from 'commander';


program
  .version('0.1.0')
  .description('Compares two configuration files and shows the difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
