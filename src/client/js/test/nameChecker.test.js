/**
 * @jest-environment jsdom
 */

import {checkForName} from "../nameChecker"

const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const dom = new JSDOM(`
<!DOCTYPE html>
<section>
</section>
`)

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("The function should receive a string input, which returns a set messge if name matches one in pre-defined list", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    test("Testing the handleSubmit() function", () => {

        var mockForm = dom.window.document.querySelector('section');
        // Mock the name input form

        mockForm.innerHTML = (
            "<h2>Your name:</h2>" +
            "<form id=\"my-form\" class=\"\" onsubmit=\"return checkForName(event)\">" +
            "<input id=\"name\" type=\"text\" name=\"input\" value=\"\" placeholder=\"Name\">" +
            "<button id=\"submit\" onclick=\"return checkForName(event)\"></button>" +
            "</form>" +
            "<p id=\"user-name\"></p>"
        )

        var clickEvent = new Event("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });

        // Add our example user input
        const userText = "Picard";

        dom.window.document.getElementById('name').value = userText;
        console.log(dom.window.document.getElementById('name').value);

        var result = dom.window.document.getElementById("user-name");

        return checkForName(clickEvent, userText, result);

        // Expect the mock dom to be updated with our message
        expect(dom.window.document.getElementById('user-name').innerText).toEqual(`Welcome Captain Picard!`);
    })

});


