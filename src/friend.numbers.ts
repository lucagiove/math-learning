import {MathGame} from "./math-game.class";
import {ETimesTableMode} from "./multiplication-tables";
import {Challenge, IChallenge} from "./challenge.class";

export class FriendNumbers extends MathGame {
    protected currentNumber: number;

    constructor(timeOut?: number, mode?: ETimesTableMode) {
        super(10, timeOut)
        this.currentNumber = 0
    }

    createChallenge(number2?: number): IChallenge | null {
        return new FriendNumbersChallenge(this.number1, number2 || this.currentNumber, this.timeOut)
    }

    isFinished(): boolean {
        return this.currentNumber > 10;
    }

    nextNumber(): void {
        this.currentNumber += 1
    }
}

class FriendNumbersChallenge extends Challenge {
    constructor(protected readonly number1: number, protected readonly number2: number, protected readonly timeOut?: number) {
        super(number1, number2, timeOut);
    }

    toString(): string {
        return `${this.number2} + ? = ${this.number1} `
    }

    protected isCorrect(answer: number): boolean {
        return this.number2 + answer === this.number1;
    }
}