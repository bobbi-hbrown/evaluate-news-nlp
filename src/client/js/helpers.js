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
                if (response.ok) {
                    return response.json()
                }
            } catch (e) {
                // if (e instanceof TypeError) {
                //     return { "errorData":"You may want to double check your API keys! Also, text must be properly formatted, in English!"};

                // } else {
                    return { "errorData":`Make sure your credentials are properly set up! ${e}`};

                // }
            }

        }
    )
}

export {
    postData,
    getData
}
