import {FriendNumbers} from "./friend.numbers";

describe('Given ten friends number in ascending mode', function () {
    const friendNumbers = new FriendNumbers()

    describe('When I ask for a challenge', function () {
        const challenge = friendNumbers.challenge()

        it('should return 0 + ? challenge', function () {
            expect(challenge?.toString()).toEqual('0 + ? = 10 ')
        });
    });

    describe('When I ask for another challenge', function () {
        const challenge = friendNumbers.challenge()

        it('should return 1 + ? challenge', function () {
            expect(challenge?.toString()).toEqual('1 + ? = 10 ')
        });
    });

    describe('When I answer properly', function () {
        const challenge = friendNumbers.challenge()
        const result = challenge?.answer(8)

        it('should return correct', function () {
            expect(result?.isCorrect()).toBeTruthy()
        });
    });

    describe('When I answer wrong', function () {
        const challenge = friendNumbers.challenge()
        const result = challenge?.answer(0)

        it('should return wrong', function () {
            expect(result?.isCorrect()).toBeFalsy()
        });
    });
});