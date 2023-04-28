import { type EAscDescRandomModes, MathGame, MathGameModes } from './math-game.class';
import { Challenge } from './challenge.class';

export class FriendNumbersAscending extends MathGame {
    protected currentNumber: number;

    constructor(timeOut?: number) {
        super(FriendNumbersChallenge, 10, timeOut);
        this.currentNumber = 0;
    }

    isFinished(): boolean {
        return this.currentNumber > 10;
    }

    nextNumber(): void {
        this.currentNumber += 1;
    }
}

class FriendNumbersChallenge extends Challenge {
    constructor(
        protected readonly number1: number,
        protected readonly number2: number,
        protected readonly timeOut?: number
    ) {
        super(number1, number2, timeOut);
    }

    toString(): string {
        return `${this.number2} + ? = ${this.number1} `;
    }

    protected isCorrect(answer: number): boolean {
        return this.number2 + answer === this.number1;
    }
}

export class FriendNumbersModes extends MathGameModes<EAscDescRandomModes> {
    protected readonly gameModes: Record<EAscDescRandomModes, new (number1: number, timeOut?: number) => MathGame> = {
        ascending: FriendNumbersAscending,
        descending: FriendNumbersAscending, // FIXME
        random: FriendNumbersAscending, // FIXME
    };
}
