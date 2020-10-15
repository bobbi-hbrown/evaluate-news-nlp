// agreement: "AGREEMENT"
// ​
// confidence: "100"
// ​
// irony: "NONIRONIC"
// ​
// model: "general_en"
// ​
// score_tag: "N"
// ​
// sentence_list: (3) […]
// ​​
// 0: Object { text: "Expand global polarity.", inip: "4", endp: "26", … }
// ​​
// 1: Object { text: "This mode allows you to choose between two different algorithms for the polarity detection of entities and concepts.", inip: "28", endp: "143", … }
// ​​
// 2: Object { text: "Enabling the parameter gives less weight to the syntactic relationships, so it's recommended for short texts with unreliable typography.", inip: "145", endp: "280", … }
// ​​
// length: 3
// ​​
// <prototype>: Array []
// ​
// sentimented_concept_list: (5) […]
// ​​
// 0: Object { form: "weight", id: "4cbf5e6040", type: "Top>Unit>WeightUnit", … }
// ​​
// 1: Object { form: "typography", id: "64f1ffb2e9", type: "Top", … }
// ​​
// 2: Object { form: "algorithm", id: "69f4574f0e", type: "Top", … }
// ​​
// 3: Object { form: "syntactic", id: "874304d30b", type: "Top", … }
// ​​
// 4: Object { form: "weight", id: "d082b1c95f", type: "Top", … }
// ​​
// length: 5
// ​​
// <prototype>: Array []
// ​
// sentimented_entity_list: []
// ​​
// length: 0
// ​​
// <prototype>: Array []
// ​
// status: Object { code: "0", msg: "OK", credits: "1", … }
// ​
// subjectivity: "OBJECTIVE"

import {postData} from "./helpers";

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let feelingsText = document.getElementById('diary-entry').value
    Client.checkForName(formText);

    await postData('/feelings', feelingsText)
        .then((res) => {
            console.log(Object.keys(res).length);
            if (Object.keys(res).length > 1) {
                console.log('success!');
                console.log(res["irony"]);
                document.getElementById('results').innerHTML = res["irony"];
                console.log('----->', res["irony"]);
            } else if (Object.keys(res).length === 1) {
                console.log(res["errorData"]);
                document.getElementById('results').innerHTML = res["errorData"];
            }

        })

}

export {handleSubmit}
