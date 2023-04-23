#!/usr/bin/env node

import * as figlet from "figlet";
import {ETimesTableMode, TimesTable} from "./multiplication-tables";
import inquirer from "inquirer";
import chalk from "chalk";
import {FriendNumbers} from "./friend.numbers";
import {MathGame} from "./math-game.class";

const gameConfigQuestions = [
    {
        type: 'input',
        name: 'number',
        message: 'Quale numero vuoi imparare?',
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

console.log(figlet.textSync("Impara   la   matematica"));

(async () => {
    while (true) {
        console.log()
        const gameAnswer = await inquirer.prompt({
            type: 'list',
            name: 'game',
            message: 'Quale gioco vuoi fare?',
            choices: [
                {name: 'Tabelline', value: TimesTable},
                {name: 'Numeri amici', value: FriendNumbers},
            ],
        })
        const {number, mode, timeout} = await inquirer.prompt(gameConfigQuestions)

        const Game: any  = gameAnswer.game
        const mathGame = new Game(number, mode, timeout * 1000)
        await runGame(mathGame);
    }
})();

async function runGame(mathGame: MathGame) {
    let challenge = mathGame.challenge()

    while (challenge) {
        const {answer} = await inquirer.prompt({
            type: 'input',
            name: 'answer',
            message: challenge.toString(),
            filter: Number
        })
        const result = challenge.answer(answer)

        if (result.isCorrect()) {
            console.log(chalk.green(' Giusto!! 🥳'))
            challenge = mathGame.challenge()
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