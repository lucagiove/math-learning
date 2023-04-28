import { Challenge } from './challenge.class';

export abstract class MathGame {
    protected abstract currentNumber: number;

    protected constructor(
        protected readonly challengeClass: new (number1: number, number2: number, timeOut?: number) => Challenge,
        protected readonly number1: number,
        protected readonly timeOut?: number
    ) {}

    challenge(number2?: number): Challenge | null {
        if (this.isFinished()) return null;
        const result = this.createChallenge(number2);
        this.nextNumber();
        return result;
    }

    protected abstract isFinished(): boolean;

    protected createChallenge(number2?: number): Challenge | null {
        return Challenge.factory(this.challengeClass, this.number1, number2 ?? this.currentNumber, this.timeOut);
    }

    protected abstract nextNumber(): void;
}

export abstract class MathGameModes<EModesType extends string | number | symbol> {
    protected abstract readonly gameModes: Record<EModesType, new (number1: number, timeOut?: number) => MathGame>;

    factory(number1: number, mode: EModesType, timeOut?: number) {
        return new this.gameModes[mode](number1, timeOut);
    }
}
