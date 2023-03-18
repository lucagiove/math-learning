import {IChallenge} from "./challenge.class";

export interface IMathGame {
    challenge: (number?: number) => IChallenge | null
}

export abstract class MathGame implements IMathGame {
    protected abstract currentNumber: number

    protected constructor(protected readonly number1: number, protected readonly timeOut?: number) {
    }

    challenge(number2?: number): IChallenge | null {
        if (this.isFinished()) return null
        const result = this.createChallenge(number2);
        this.nextNumber();
        return result
    }

    protected abstract isFinished(): boolean;

    protected abstract createChallenge(number2: number | undefined): IChallenge | null

    protected abstract nextNumber(): void;
}