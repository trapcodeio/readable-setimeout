import test = require("japa");
import Timeout = require("../");

/**
 * To test we won't be using actual timeouts, we would only test the function that generates the timeout
 * from a given string.
 *
 * Note: Because it is a guess work, when it comes to seconds it maybe 1s less or more.
 */
// Set our ±diff value
const diff = 1000;
function msIsNear(ms: number, expected: number) {
    if (ms >= (expected - diff) && ms <= (expected + diff)) {
        return true;
    }
    return false
}

// Strings and expected values in milliseconds
const Dictionary = {
    msIn: {
        "10 seconds": 10 * 1000,
        "30 seconds": 30 * 1000,
        "1 minute 30 seconds": 90 * 1000
    },
    ms: {
        "in 10 seconds time": 10 * 1000,
        "30 seconds from now": 30 * 1000,
        "1 minute 30 seconds from now": 90 * 1000,
        "2 hours 2 minutes from now": 7320000,
        "next 5 hours": 1.8e+7
    }
}


// Loop and run tests for 'msIn'
for (const msString of Object.keys(Dictionary.msIn)) {
    const expected = Dictionary.msIn[msString as keyof typeof Dictionary.msIn];
    const returned = Timeout.msIn(msString);

    test(`${msString}: (${returned}), ±${diff}`, assert => {
        assert.equal(
            msIsNear(returned, expected), true,
            `----Expected: (${expected}±${diff})----`
        );
    })
}


// Loop and run tests for 'ms'
for (const msString of Object.keys(Dictionary.ms)) {
    const expected = Dictionary.ms[msString as keyof typeof Dictionary.ms];
    const returned = Timeout.msIn(msString);

    test(`${msString}: (${returned}), ±${diff}`, assert => {
        assert.equal(
            msIsNear(returned, expected),
            true,
            `----Expected: (${expected}±${diff})----`
        );
    })
}