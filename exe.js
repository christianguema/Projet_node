#!/usr/bin/env node
import { Command } from "commander";
//const { Command } = require('commander');
const program = new Command();

program
  .name('ifnti')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command('ifnti')
        .argument('<string>', "Niveau d'etude (L1, L2, L3)")
        .action((str, option) =>{
            console.log(str);
            console.log("bonjour "+str);
        })

program.parse()

