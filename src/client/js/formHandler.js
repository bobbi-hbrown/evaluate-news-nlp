// Make a get request
async function getData(url) {
    try {
        const response = await fetch(url);
        return response;
    } catch (error) {
        console.log("Error fetching API data!", error);
    }
}

// Make a post request
async function postData(url, data) {
    return await fetch(url, {
        method: 'POST',
        credentials: 'include', // default - allows requests from same URL only
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}), // body data type must match "Content-Type" header
    }).then(
        function(response) {
            try {
                console.log('fetch post');
                if (response.status === 200) {
                    return response.json()
                }

            } catch (error) {
                console.log("error", error);

            }
        }
    )
}

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    // Client.checkForName(formText)

    console.log("Form Submitted-->", JSON.stringify({"data": formText}), typeof JSON.stringify({"data": formText}));
    // return fetch('/feelings')
    await postData('/feelings', {"data": formText})
        // .then(async() => {
        //     await getData('/data').then(async (res) => {
        //         console.log('----->', res);
        //         console.log('success ---->', res.message);
        //         document.getElementById('results').innerHTML = res.message
        //         // res = await response.text();
        //         // return updateUI(res); // Programatically update the 'recent entry' section
        //     })
        // })

}

export {handleSubmit}
