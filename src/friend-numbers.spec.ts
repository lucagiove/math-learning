import {ETimesTableMode} from "./multiplication-tables";
import {MathGame} from "./math-game.class";
import {Challenge, IChallenge} from "./challenge.class";

class FriendNumbers extends MathGame {
    protected currentNumber: number;

    constructor(number1: number, timeOut?: number, mode?: ETimesTableMode) {
        super(number1, timeOut)
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

describe('Given 10 as number to find the friends in ascending mode', function () {
    const friendNumbers = new FriendNumbers(10)

    describe('When I ask for a challenge', function () {
        const challenge = friendNumbers.challenge()

        it('should return 0 + ? challenge', function () {
            expect(challenge?.toString()).toEqual('0 + ? = 10 ')
        });
    });

    describe('When I ask for another challenge', function () {
        const challenge = friendNumbers.challenge()

        it('should return 1 + ? challenge', function () {
            expect(challenge?.toString()).toEqual('1 + ? = 10 ')
        });
    });

    describe('When I answer properly', function () {
        const challenge = friendNumbers.challenge()
        const result = challenge?.answer(8)

        it('should return correct', function () {
            expect(result?.toString()).toEqual('Correct!')
        });
    });
});