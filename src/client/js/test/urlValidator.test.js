import { isURL } from "../urlValidator"
import {describe, expect} from "@jest/globals";

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("The function should return true if the URL is valid, else it should return false", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    test("Testing the isUrl() function, should return true", () => {

        const validUrl = "https://www.bbc.co.uk/news";

        expect(isURL(validUrl)).toEqual(true);
    })

    test("Testing the handleSubmit() function, should return false", () => {

        const badUrl = "bbc .co.uk/news";

        expect(isURL(badUrl)).toEqual(false);
    })
});


