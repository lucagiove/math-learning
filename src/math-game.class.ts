import {Challenge, IChallenge} from "./challenge.class";

export interface IMathGame {
    challenge: (number?: number) => IChallenge | null
}

export abstract class MathGame implements IMathGame {
    protected abstract currentNumber: number

    protected constructor(protected readonly challengeClass: new (number1: number, number2: number, timeOut?: number) => Challenge,
                          protected readonly number1: number,
                          protected readonly timeOut?: number) {
    }

    challenge(number2?: number): IChallenge | null {
        if (this.isFinished()) return null
        const result = this.createChallenge(number2);
        this.nextNumber();
        return result
    }

    protected abstract isFinished(): boolean;

    protected createChallenge(number2?: number): IChallenge | null {
        return new this.challengeClass(
            this.number1,
            number2 || this.currentNumber,
            this.timeOut)
    }

    protected abstract nextNumber(): void;
}