function checkForName(event) {

    event.preventDefault();
    let formText = document.getElementById('name').value;
    console.log("::: Running checkForName :::", formText);

    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(formText)) {
        alert("Welcome, Captain!");
    }
}

export { checkForName }
