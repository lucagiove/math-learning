import { type Answer, CorrectAnswer, WrongAnswer } from './answer.class';

export abstract class Challenge implements Challenge {
    protected readonly requestedTime: number;

    protected constructor(
        protected readonly number1: number,
        protected readonly number2: number,
        protected readonly timeOut?: number
    ) {
        this.requestedTime = Date.now();
    }

    static factory(
        ChallengeClass: new (
            number1: number,
            number2: number,
            timeOut?: number
        ) => Challenge,
        number1: number,
        number2: number,
        timeOut?: number
    ) {
        return new ChallengeClass(number1, number2, timeOut);
    }

    abstract toString(): string;

    answer(number: number): Answer {
        const elapsedTime = this.countElapsedTime();
        if (this.isCorrect(number))
            return new CorrectAnswer(
                elapsedTime,
                this.checkTimeOut(elapsedTime)
            );
        return new WrongAnswer(elapsedTime, this.checkTimeOut(elapsedTime));
    }

    private checkTimeOut(elapsedTime: number) {
        let timedOut: boolean = false;
        if (this.timeOut) timedOut = elapsedTime > this.timeOut;
        return timedOut;
    }

    private countElapsedTime() {
        return Date.now() - this.requestedTime;
    }

    protected abstract isCorrect(number: number): boolean;
}
