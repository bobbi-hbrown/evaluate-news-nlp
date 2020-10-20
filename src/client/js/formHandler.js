import {postData} from "./helpers";
import {isURL} from "./urlValidator";

async function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let urlText = document.getElementById('diary-entry').value;

    if (isURL(urlText)) {
        await postData('http://localhost:8000/feelings', urlText)
            .then((res) => {
                if ('code' in res.status) {
                    console.log('error', res.code)
                    if (res.status.code == 0) {
                        console.log('success!');
                        document.getElementById('results').innerHTML = `Your URL: ${res["sentence_list"][0]["text"]}`;
                        document.getElementById('irony').innerHTML = `Irony: ${res["irony"]}`;
                        document.getElementById('subjectivity').innerHTML = `Subjectivity: ${res["subjectivity"]}`;
                    } else if (res.status.code == 100) {
                        console.log('100 error')
                        document.getElementById('results').innerHTML = "Make sure your credentials are working properly!";
                    }
                } else {
                    console.log('noooo :(', res.status.code);
                    document.getElementById('results').innerHTML = res["errorData"];
                }

            })
    } else {
        document.getElementById('results').innerHTML = "Invalid URL! Please check the URL provided and try again."
    }



}

export {handleSubmit}
