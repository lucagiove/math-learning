export abstract class Answer {
    constructor(readonly elapsedTime: number, readonly timedOut: boolean) {}

    abstract isCorrect(): boolean
}

export class CorrectAnswer extends Answer {
    isCorrect() {
        return true
    }
}

export class WrongAnswer extends Answer {
    isCorrect() {
        return false
    }
}