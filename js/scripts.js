// constants for query selector
var customNumberInput = document.querySelector('#customNumber');
var customColorBtn = document.querySelector('.custColor');
var randomColorBtn = document.querySelector('.randColor');
var imageSelect = document.querySelector('#imageSelect');
var imagePlaceholder = document.querySelector('#images');
var idHolder = document.querySelector("#myStudentId");

var body = document.querySelector('body');

var number;

// Just a small listener to track the last clicked button and determine the the function the the "Enter" key should call
var lastClicked = customColorBtn;

document.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        lastClicked.click();
    }
});

var imgsSrc = "img/";
var imgList = [];

// function to change bg color from user input and add student id
function changeCustomColor(e, isRandom = false) {
    idHolder.textContent = "My student id is: 200471230"

    // Grab the value from the input field
    number = customNumberInput.value;

    // Using switch case to change the background color
    switch (true) {
        case (number == ""):
            body.style.backgroundColor = "red";
            body.style.color = "white";
            break;
        case (number < 0 || number > 100):
            body.style.backgroundColor = "red";
            body.style.color = "white";
            break;
        case number <= 20:
            body.style.backgroundColor = "green";
            body.style.color = "white";
            break;
        case number <= 40:
            body.style.backgroundColor = "blue";
            body.style.color = "white";
            break;
        case number <= 60:
            body.style.backgroundColor = "orange";
            body.style.color = "white";
            break;
        case number <= 80:
            body.style.backgroundColor = "purple";
            body.style.color = "white";
            break;
        case number <= 100:
            body.style.backgroundColor = "yellow";
            body.style.color = "black";
            break;
        default:
            body.style.backgroundColor = "red";
            body.style.color = "white";
            break;
    }

    lastClicked = customColorBtn;

    console.log(isRandom);

    if (!isRandom) {
        customNumberInput.value = "";
    }

}

// function to change bg color from random no.
function changeRandomColor() {
    // Generating a random number between 0 and 100
    var randomNum = Math.floor(Math.random() * 100);

    customNumberInput.value = randomNum;

    number = randomNum;

    changeCustomColor(null, true);

    lastClicked = randomColorBtn;
}

// function to generate options for select list
function addList() {
    // Tip: you might have to check length condition so that the list does not keep growing when clicked
    // Tip: use createElement and appendChild inside every for loop to add elements to select list from array 

    // make sure that the list is empty
    if (imgList == 0) {
        for (var i = 0; i < 5; i++){
            var imgName = imgsSrc + "img" + (i + 1) + ".jpg";
            imgList.push(imgName);
            var newOption = new Option("Image#" + (i + 1), imgName);
            
            imageSelect.add(newOption, undefined);
        }
    }
}

// function to change image
function changeImage() {
    // Tip: use setAttribute method to change src attribute of image element
    var imgSrc = imageSelect.value;
    imagePlaceholder.setAttribute("src", imgSrc);
}

// event listeners for on click event of buttons and select
customColorBtn.addEventListener('click', changeCustomColor);
randomColorBtn.addEventListener('click', changeRandomColor);
// event listeners for on change event of select
imageSelect.addEventListener('click', addList);
imageSelect.addEventListener('change', changeImage);