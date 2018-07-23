#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';


program
  .version('0.1.0')
  .description('Compares two configuration files and shows the difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action(((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  }));

program.parse(process.argv);
