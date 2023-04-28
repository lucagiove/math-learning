import { MathGame, MathGameModes } from './math-game.class';
import { Challenge } from './challenge.class';

class TimesTableDescending extends MathGame {
    protected currentNumber: number;

    constructor(number1: number, timeOut?: number) {
        super(TimesTableChallenge, number1, timeOut);
        this.currentNumber = 10;
    }

    protected nextNumber() {
        this.currentNumber -= 1;
    }

    protected isFinished() {
        return this.currentNumber < 0;
    }
}

class TimesTableAscending extends MathGame {
    protected currentNumber: number;

    constructor(number1: number, timeOut?: number) {
        super(TimesTableChallenge, number1, timeOut);
        this.currentNumber = 0;
    }

    protected nextNumber() {
        this.currentNumber += 1;
    }

    protected isFinished() {
        return this.currentNumber > 10;
    }
}

class TimesTableRandom extends MathGame {
    protected currentNumber: number;
    private counter: number;

    constructor(number1: number, timeOut?: number) {
        super(TimesTableChallenge, number1, timeOut);
        this.currentNumber = Math.floor(Math.random() * 11);
        this.counter = 0;
    }

    protected nextNumber() {
        this.currentNumber = Math.floor(Math.random() * 11);
        this.counter += 1;
    }

    protected isFinished() {
        return this.counter > 10;
    }
}

class TimesTableChallenge extends Challenge {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(number1: number, number2: number, timeOut?: number) {
        super(number1, number2, timeOut);
    }

    toString() {
        return `${this.number1} x ${this.number2} = `;
    }

    protected isCorrect(number: number) {
        return number === this.number1 * this.number2;
    }
}

export enum ETimesTableModes {
    ascending = 'ascending',
    descending = 'descending',
    random = 'random',
}

export class TimesTableModes extends MathGameModes<ETimesTableModes> {
    protected readonly gameModes: Record<ETimesTableModes, new (number1: number, timeOut?: number) => MathGame> = {
        ascending: TimesTableAscending,
        descending: TimesTableDescending,
        random: TimesTableRandom,
    };
}
