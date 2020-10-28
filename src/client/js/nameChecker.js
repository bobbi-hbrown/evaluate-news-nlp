function checkForName(event, formText, elem=null) {

    event.preventDefault();
    // let formText = document.getElementById('name').value;
    console.log("::: Running checkForName :::", formText);

    var names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]
    if (elem == null) {
        var result = document.getElementById("user-name");
    } else {
        var result = elem;
    }

    if(names.includes(formText)) {
        result.innerHTML = `Welcome Captain ${formText}!`;
    }
}

export { checkForName }
