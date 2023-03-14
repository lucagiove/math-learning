import {Answer} from "./answer.class";

export interface IMathGame {
    challenge: (number?: number) => IChallenge | null
}

export interface IChallenge {
    toString(): string;

    answer(number: number): Answer;
}