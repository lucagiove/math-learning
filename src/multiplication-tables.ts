export enum EMode {
    ascending = 'ascending',
    descending = 'descending',
    random = 'random'
}

export class TimesTable {
    private currentNumber: number
    constructor(private readonly number1: number, private readonly mode: EMode) {
        this.currentNumber = 0
        if(mode === EMode.descending)
            this.currentNumber = 10
    }

    challenge(number2?: number): Challenge {
        const result = new Challenge(this.number1, number2 || this.currentNumber)
        this.nextNumber();
        return result
    }

    private nextNumber() {
        if(this.mode === EMode.ascending) {
            this.currentNumber += 1
            return
        }
        this.currentNumber -= 1
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
}

class CorrectAnswer implements Answer {
    toString() {
        return 'Correct!'
    }
}

class WrongAnswer implements Answer {
    toString() {
        return 'Wrong!'
    }
}