import {IMathGame, MathGame} from "./math-game.class";
import {Challenge, IChallenge} from "./challenge.class";

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
    ) {
        switch (this.mode) {
            case ETimesTableMode.ascending:
                this.timesTableMode = new TimesTableAscending(number1, timeOut)
                break
            case ETimesTableMode.descending:
                this.timesTableMode = new TimesTableDescending(number1, timeOut)
                break
            case ETimesTableMode.random:
                this.timesTableMode = new TimesTableRandom(number1, timeOut)
                break
        }
    }

    challenge(number?: number): IChallenge | null {
        return this.timesTableMode.challenge(number)
    }
}

class TimesTableDescending extends MathGame {
    protected currentNumber: number

    constructor(number1: number, timeOut?: number) {
        super(TimesTableChallenge, number1, timeOut);
        this.currentNumber = 10
    }

    protected nextNumber() {
        this.currentNumber -= 1
    }

    protected isFinished() {
        return this.currentNumber < 0
    }
}

class TimesTableAscending extends MathGame {
    protected currentNumber: number

    constructor(number1: number, timeOut?: number) {
        super(TimesTableChallenge, number1, timeOut)
        this.currentNumber = 0
    }

    protected nextNumber() {
        this.currentNumber += 1
    }

    protected isFinished() {
        return this.currentNumber > 10
    }
}

class TimesTableRandom extends MathGame {
    protected currentNumber: number
    private counter: number

    constructor(number1: number, timeOut?: number) {
        super(TimesTableChallenge, number1, timeOut)
        this.currentNumber = Math.floor(Math.random() * 11);
        this.counter = 0
    }

    protected nextNumber() {
        this.currentNumber = Math.floor(Math.random() * 11);
        this.counter += 1
    }

    protected isFinished() {
        return this.counter > 10
    }
}

class TimesTableChallenge extends Challenge {
    constructor(number1: number,
                number2: number,
                timeOut?: number) {
        super(number1, number2, timeOut);
    }

    toString() {
        return `${this.number1} x ${this.number2} = `
    }
    protected isCorrect(number: number) {
        return number === this.number1 * this.number2;
    }
}