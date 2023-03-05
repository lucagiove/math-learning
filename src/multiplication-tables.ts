export enum EMode {
    ascending = 'ascending',
    descending = 'descending',
    random = 'random'
}

export class TimesTable {
    private currentNumber: number

    constructor(private readonly number1: number,
                private readonly mode: EMode,
                private readonly timeOut?: number
    ) {
        switch (this.mode) {
            case EMode.ascending:
                this.currentNumber = 0
                break
            case EMode.descending:
                this.currentNumber = 10
                break
            case EMode.random:
                this.currentNumber = Math.floor(Math.random() * 11);
                break
        }
    }

    challenge(number2?: number): Challenge | null {
        if (this.isFinished()) return null
        const result = new Challenge(this.number1, number2 || this.currentNumber, this.timeOut)
        this.nextNumber();
        return result
    }

    private nextNumber() {
        switch (this.mode) {
            case EMode.ascending:
                this.currentNumber += 1
                break
            case EMode.descending:
                this.currentNumber -= 1
                break
            case EMode.random:
                this.currentNumber = Math.floor(Math.random() * 11);
                break
        }
    }

    private isFinished() {
        switch (this.mode) {
            case EMode.ascending:
                return this.currentNumber === 10
            case EMode.descending:
                return this.currentNumber === 0
        }
        return false
    }
}

export class Challenge {
    private readonly requestedTime: number

    constructor(private readonly number1: number,
                private readonly number2: number,
                private readonly timeOut?: number) {
        this.requestedTime = Date.now()
    }

    toString() {
        return `${this.number1} x ${this.number2} = `
    }

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

    private isCorrect(number: number) {
        return number === this.number1 * this.number2;
    }
}

export abstract class Answer {
    abstract toString(): string

    abstract correct: boolean

    constructor(readonly elapsedTime: number, readonly timedOut: boolean) {
    }
}

class CorrectAnswer extends Answer {
    correct = true

    toString() {
        return 'Correct!'
    }
}

class WrongAnswer extends Answer {
    correct = false

    toString() {
        return 'Wrong!'
    }
}