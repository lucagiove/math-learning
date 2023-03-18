#!/usr/bin/env node

import * as figlet from "figlet";
import {ETimesTableMode, TimesTable} from "./multiplication-tables";
import {IMathGame} from "./math-game.class";
import inquirer from "inquirer";
import chalk from "chalk";

console.log(figlet.textSync("Impara   la   matematica"));

(async () => {
    while (true) {
        console.log()
        const questions = [
            {
                type: 'input',
                name: 'number',
                message: 'Vuoi provare la tabellina del?',
                validate(val: number) {
                    return !isNaN(val)
                }
            },
            {
                type: 'list',
                name: 'mode',
                message: 'In che ordine?',
                choices: [
                    {name: 'Crescente', value: ETimesTableMode.ascending},
                    {name: 'Decrescente', value: ETimesTableMode.descending},
                    {name: 'Casuale', value: ETimesTableMode.random},
                ],
            },
            {
                type: 'input',
                name: 'timeout',
                message: 'In quanto secondi pensi di riuscire a rispondere?',
                validate(val: number) {
                    return !isNaN(val)
                },
                default: undefined
            }
        ];
        const {number, mode, timeout} = await inquirer.prompt(questions)

        const timesTable = new TimesTable(number, mode, timeout * 1000)
        await runGame(timesTable);
    }
})();

async function runGame(timesTable: IMathGame) {
    let challenge = timesTable.challenge()

    while (challenge) {
        const {answer} = await inquirer.prompt({
            type: 'input',
            name: 'answer',
            message: challenge.toString(),
            filter: Number
        })
        const result = challenge.answer(answer)

        if (result.correct) {
            console.log(chalk.green(' Giusto!! 🥳'))
            challenge = timesTable.challenge()
        } else {
            console.log(chalk.red(' Sbagliato!!') + ' 🤯 riprova')
        }

        if (result.timedOut) {
            console.log(' ⏱️ Ci hai messo ' + chalk.red(result.elapsedTime / 1000) + ' secondi')
            console.log(chalk.yellow(' Sei stato/a troppo lento/a!! 🐌'))
        } else {
            console.log(' ⏱️ Ci hai messo ' + chalk.green(result.elapsedTime / 1000) + ' secondi')
        }
    }
}