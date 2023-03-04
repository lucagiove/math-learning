export enum EMode {
    ascending = 'ascending',
    descending = 'descending',
    random = 'random'
}

export class TimesTable {
    private currentNumber: number
    constructor(private readonly number1: number, private readonly mode: EMode) {
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

    challenge(number2?: number): Challenge {
        const result = new Challenge(this.number1, number2 || this.currentNumber)
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
}

export class Challenge {

    constructor(private readonly number1: number, private readonly number2: number) {
    }

    toString() {
        return `${this.number1} x ${this.number2} = `
    }

    answer(number: number): Answer {
        if (number === this.number1 * this.number2)
            return new CorrectAnswer()
        return new WrongAnswer()
    }
}

interface Answer {
    toString(): string
    correct: boolean
}

class CorrectAnswer implements Answer {
    correct = true
    toString() {
        return 'Correct!'
    }
}

class WrongAnswer implements Answer {
    correct = false
    toString() {
        return 'Wrong!'
    }
}