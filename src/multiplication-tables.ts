import {Answer, CorrectAnswer, WrongAnswer} from "./answer.class";
import {IChallenge, IMathGame} from "./math-game.interface";

export enum ETimesTableMode {
    ascending = 'ascending',
    descending = 'descending',
    random = 'random'
}

export class TimesTable implements IMathGame {
    private timesTableMode: IMathGame

    constructor(private readonly number1: number,
                private readonly mode: ETimesTableMode,
                private readonly timeOut?: number
    ){
        this.timesTableMode = new TimesTableModes(number1, mode, timeOut)
    }

    challenge(number?: number): IChallenge | null {
        return this.timesTableMode.challenge(number)
    }

}

export class TimesTableModes implements IMathGame {
    private currentNumber: number

    constructor(private readonly number1: number,
                private readonly mode: ETimesTableMode,
                private readonly timeOut?: number
    ) {
        switch (this.mode) {
            case ETimesTableMode.ascending:
                this.currentNumber = 0
                break
            case ETimesTableMode.descending:
                this.currentNumber = 10
                break
            case ETimesTableMode.random:
                this.currentNumber = Math.floor(Math.random() * 11);
                break
        }
    }

    challenge(number2?: number): IChallenge | null {
        if (this.isFinished()) return null
        const result = new TimesTableChallenge(this.number1, number2 || this.currentNumber, this.timeOut)
        this.nextNumber();
        return result
    }

    private nextNumber() {
        switch (this.mode) {
            case ETimesTableMode.ascending:
                this.currentNumber += 1
                break
            case ETimesTableMode.descending:
                this.currentNumber -= 1
                break
            case ETimesTableMode.random:
                this.currentNumber = Math.floor(Math.random() * 11);
                break
        }
    }

    private isFinished() {
        switch (this.mode) {
            case ETimesTableMode.ascending:
                return this.currentNumber === 10
            case ETimesTableMode.descending:
                return this.currentNumber === 0
        }
        return false
    }
}

export class TimesTableChallenge implements IChallenge {
    private readonly requestedTime: number

    constructor(private readonly number1: number,
                private readonly number2: number,
                private readonly timeOut?: number) {
        this.requestedTime = Date.now()
    }

    toString() {
        return `${this.number1} x ${this.number2} = `
    }

    answer(number: number): Answer {
        const elapsedTime = this.countElapsedTime()
        if (this.isCorrect(number))
            return new CorrectAnswer(elapsedTime, this.checkTimeOut(elapsedTime))
        return new WrongAnswer(elapsedTime, this.checkTimeOut(elapsedTime))
    }

    private checkTimeOut(elapsedTime: number) {
        let timedOut: boolean = false
        if (this.timeOut)
            timedOut = elapsedTime > this.timeOut
        return timedOut;
    }

    private countElapsedTime() {
        return Date.now() - this.requestedTime;
    }

    private isCorrect(number: number) {
        return number === this.number1 * this.number2;
    }
}