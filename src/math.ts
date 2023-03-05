#!/usr/bin/env node

import {Command} from "commander";
import figlet from "figlet";
import * as readline from 'node:readline/promises';
import {EMode, TimesTable} from "./multiplication-tables";

console.log(figlet.textSync("Impara   la   matematica"));

const program = new Command();

program
    .version("0.0.1")
    .description("Impara le tabelline")

program
    .argument('<numero>', "Tabellina da imparare")
    .option('-m, --mode [mode]', 'Ordine: crescente, descrescente, casuale', 'casuale')
    .option('-t, --timeout [timeout]', 'Tempo per rispondere in ms', '')

program.action(async (number, options) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const mode = parseMode(options.mode);
    const timeout = parseNumber(options.timeout)

    const timesTable = new TimesTable(number, mode, timeout)
    let challenge = timesTable.challenge()

    while (challenge) {
        const answer = await rl.question(challenge.toString());
        const result = challenge.answer(parseNumber(answer))
        if (result.correct) {
            console.log(' Giusto!! 🥳')
            challenge = timesTable.challenge()
        } else {
            console.log(' Sbagliato!! 🤯 riprova')
        }

        if (result.timedOut) {
            console.log(` ⏱️ Ci hai messo ${result.elapsedTime}ms`)
            console.log(' Sei stato troppo lento/a!! 🐌')
        }
    }
    rl.close()
})

program.parse(process.argv)

function parseMode(mode: string) {
    let result = EMode.random
    switch (mode) {
        case 'crescente':
            result = EMode.ascending
            break
        case 'decrescente':
            result = EMode.descending
            break
    }
    return result;
}

function parseNumber(number: string) {
    return Number(number)
}