export abstract class Answer {
    abstract toString(): string

    abstract correct: boolean

    constructor(readonly elapsedTime: number, readonly timedOut: boolean) {
    }
}

export class CorrectAnswer extends Answer {
    correct = true

    toString() {
        return 'Correct!'
    }
}

export class WrongAnswer extends Answer {
    correct = false

    toString() {
        return 'Wrong!'
    }
}