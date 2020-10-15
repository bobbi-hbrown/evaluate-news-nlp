import { handleSubmit } from "../formHandler"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("The function should receive a string input (mocking user's text) return a string response indicating levels of 'irony'", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    test("Testing the handleSubmit() function", () => {

        const userText = "Main dishes were quite good, but desserts were too sweet for me.";

        // Set the user's text input field to the string above, which if working correctly should produce value "NONIRONIC"
        document.getElementById('name').innerText = userText;

        expect(handleSubmit()).toEqual("NONIRONIC");
    })

    test("Testing the handleSubmit() function", () => {

        const userText = "Не́которые иностра́нцы ду́мают, что в Росси́и медве́ди хо́дят по у́лицам";

        // Set the user's text input field to the string above, which if working correctly should produce value "NONIRONIC"
        document.getElementById('name').innerText = userText;

        expect(handleSubmit()).toEqual("Text must be properly formatted, in English!");
    })
});


