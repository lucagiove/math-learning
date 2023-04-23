import {Answer, CorrectAnswer, WrongAnswer} from "./answer.class";

export abstract class Challenge implements Challenge {
    protected readonly requestedTime: number

    constructor(protected readonly number1: number, protected readonly number2: number, protected readonly timeOut?: number) {
        this.requestedTime = Date.now()
    }

    abstract toString(): string;

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

    protected abstract isCorrect(number: number): boolean;
}