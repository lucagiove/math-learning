import { ETimesTableModes, TimesTableModes } from './multiplication-tables';
import { type Answer } from './answer.class';
import { type Challenge } from './challenge.class';

describe('Given a times table value of 2 in ascending mode', function () {
    const timesTable = new TimesTableModes().factory(2, ETimesTableModes.ascending);

    describe('When I ask for a challenge', function () {
        const challenge = timesTable.challenge();

        it('should return 2 x 0 challenge', function () {
            expect(challenge?.toString()).toEqual('2 x 0 = ');
        });
    });

    describe('When I ask for another challenge', function () {
        const challenge = timesTable.challenge();

        it('should return 2 x 1 challenge', function () {
            expect(challenge?.toString()).toEqual('2 x 1 = ');
        });
    });
});

describe('Given a times table value of 2 in ascending mode', function () {
    const timesTable = new TimesTableModes().factory(2, ETimesTableModes.ascending);

    describe('When I ask for all challenges', function () {
        let challenge: Challenge | null;
        for (let i = 0; i <= 11; i++) {
            challenge = timesTable.challenge();
        }

        it('should not return a new challenge', function () {
            expect(challenge).toBeNull();
        });
    });
});

describe('Given a times table value of 2 in descending mode', function () {
    const timesTable = new TimesTableModes().factory(2, ETimesTableModes.descending);

    describe('When I ask for all challenges', function () {
        let challenge: Challenge | null;
        for (let i = 0; i <= 11; i++) {
            challenge = timesTable.challenge();
        }

        it('should not return a new challenge', function () {
            expect(challenge).toBeNull();
        });
    });
});

describe('Given a times table value of 2 in descending mode', function () {
    const timesTable = new TimesTableModes().factory(2, ETimesTableModes.descending);

    describe('When I ask for a challenge', function () {
        const challenge = timesTable.challenge();

        it('should return 2 x 10 challenge', function () {
            expect(challenge?.toString()).toEqual('2 x 10 = ');
        });
    });

    describe('When I ask for another challenge', function () {
        const challenge = timesTable.challenge();

        it('should return 2 x 9 challenge', function () {
            expect(challenge?.toString()).toEqual('2 x 9 = ');
        });
    });
});

describe('Given a times table value of 2 in random mode', function () {
    const timesTable = new TimesTableModes().factory(2, ETimesTableModes.random);

    describe('When I ask for a challenge twice', function () {
        const challenge1 = timesTable.challenge();
        const challenge2 = timesTable.challenge();

        it('might not return 2 x 0 and 2 x 1', function () {
            expect(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `${challenge1?.toString()}${challenge2?.toString()}`
            ).not.toEqual('2 x 0 = 2 x 1 = ');
        });
    });
});

describe('Given a times table value of 2 multiplied to 1 challenge', function () {
    const timesTable = new TimesTableModes().factory(2, ETimesTableModes.ascending);
    const challenge = timesTable.challenge(1);

    describe('When I try the right answer', function () {
        const result = challenge?.answer(2);

        it('should return correct', function () {
            expect(result?.isCorrect()).toBeTruthy();
        });
    });

    describe('When I try the wrong answer', function () {
        const result = challenge?.answer(0);

        it('should return wrong', function () {
            expect(result?.isCorrect()).toBeFalsy();
        });
    });
});

describe('Given a times table value of 2', function () {
    const timesTable = new TimesTableModes().factory(2, ETimesTableModes.ascending);

    describe('And challenge multiplied to 3', function () {
        const challenge = timesTable.challenge(3);

        describe('When I print the challenge', function () {
            const result = challenge?.toString();

            it('should return 2 x 3 =', function () {
                expect(result).toEqual('2 x 3 = ');
            });
        });

        describe('When I answer 6', function () {
            const result = challenge?.answer(6);

            it('should return correct', function () {
                expect(result?.isCorrect()).toBeTruthy();
            });
        });
    });
});

describe('Given a times table value of 3', function () {
    const timesTable = new TimesTableModes().factory(3, ETimesTableModes.ascending);

    describe('And challenge multiplied to 4', function () {
        const challenge = timesTable.challenge(4);

        describe('When I print the challenge', function () {
            const result = challenge?.toString();

            it('should return 3 x 4 =', function () {
                expect(result).toEqual('3 x 4 = ');
            });
        });

        describe('When I answer 12', function () {
            const result = challenge?.answer(12);

            it('should return correct', function () {
                expect(result?.isCorrect()).toBeTruthy();
            });
        });
    });
});

describe('Given a times table value of 2 with timeout', function () {
    const timesTable = new TimesTableModes().factory(2, ETimesTableModes.ascending, 20);

    describe('When I answer a challenge after timeout', function () {
        let result: Answer | undefined;
        const msToDelay = 25;

        beforeEach(async function () {
            const challenge = timesTable.challenge();
            await delay(msToDelay);
            result = challenge?.answer(1);
        });

        it('should return an answer with the elapsed time', function () {
            expect(result?.elapsedTime).toBeGreaterThanOrEqual(msToDelay);
        });

        it('should return a timed out answer', function () {
            expect(result?.timedOut).toBeTruthy();
        });
    });

    describe('When I answer a challenge before timeout', function () {
        let result: Answer | undefined;

        beforeEach(function () {
            const challenge = timesTable.challenge();
            result = challenge?.answer(1);
        });

        it('should return an answer with the elapsed time', function () {
            expect(result?.elapsedTime).toBeGreaterThanOrEqual(0);
        });

        it('should return a not timed out answer', function () {
            expect(result?.timedOut).toBeFalsy();
        });
    });
});

async function delay(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
}
