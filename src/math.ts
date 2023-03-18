#!/usr/bin/env node

import {Command} from "commander";
import figlet from "figlet";
import chalk from 'chalk';
import * as readline from 'node:readline/promises';
import {ETimesTableMode, TimesTable} from "./multiplication-tables";
import {IMathGame} from "./math-game.class";

console.log(figlet.textSync("Impara   la   matematica"));

const program = new Command();

program
    .version("0.0.1")
    .description("Impara le tabelline")

program.action(async () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    while (true) {
        const number = parseNumber(await rl.question('Vuoi provare la tabellina del? '));
        const mode = parseMode(await rl.question('In che ordine? [ crescente | decrescente | casuale ] '));
        const timeout = parseNumber(await rl.question('In quanto tempo pensi di rispondere? '));

        const timesTable = new TimesTable(number, mode, timeout)
        await runGame(timesTable, rl);
    }
    rl.close()
})

program.parse(process.argv)

function parseMode(mode: string) {
    let result = ETimesTableMode.random
    switch (mode) {
        case 'crescente':
            result = ETimesTableMode.ascending
            break
        case 'decrescente':
            result = ETimesTableMode.descending
            break
    }
    return result;
}

function parseNumber(number: string) {
    return Number(number)
}

async function runGame(timesTable: IMathGame, rl: readline.Interface) {
    let challenge = timesTable.challenge()

    while (challenge) {
        const answer = await rl.question(challenge.toString());
        const result = challenge.answer(parseNumber(answer))
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