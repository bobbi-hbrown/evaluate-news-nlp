import {postData} from "./helpers";

async function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let feelingsText = document.getElementById('diary-entry').value;

    await postData('http://localhost:8000/feelings', feelingsText)
        .then((res) => {
            console.log(Object.keys(res).length);
            if (Object.keys(res).length > 1) {
                console.log('success!');
                console.log(res["irony"]);
                document.getElementById('results').innerHTML = `Your sentence: ${feelingsText}`;
                document.getElementById('irony').innerHTML = `Irony: ${res["irony"]}`;
                document.getElementById('subjectivity').innerHTML = `Subjectivity: ${res["subjectivity"]}`;
            } else if (Object.keys(res).length === 1) {
                console.log(res["errorData"]);
                document.getElementById('results').innerHTML = res["errorData"];
            }

        })

}

export {handleSubmit}
