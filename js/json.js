/* STEP 2: Bind the HEADER and the SECTION elements above to variables */
const headerElement = document.querySelector("header");
const sectionElement = document.querySelector("section");
// STEP 3a: Create the asynchronous function populate()
async function populate() {
    // Introducing JavaScript Object Notation (JSON): https://json.org/
    // STEP 4a: Create i-scream.json file with companyName, headOffice, established, active, topFlavors(name, calories, type, ingredients, image) */
    // STEP 4b: Store the URL of a JSON file in a variable */
    const jsonURL = "https://vidwantstodevelop.github.io/js-json-file/i-scream.json";

    // STEP 5: Use the new URL to create a new request object
    const request = new Request(jsonURL);
    // STEP 6: Make a network request with the fetch() function, which returns a Response object
    const resp = await fetch(request);
    console.log(resp);
    // STEP 7: Capture the returned Response object and covert to a JSON object using json()
    const respObj = await resp.json();
    // STEP 8: Output the iScream JSON object to the console 
    console.log(respObj);
    // STEP 9a: Invoke the populateHeader function here, then build it below
    populateHeader(respObj);
    // STEP 10a: Invoke the showTopFlavors function here, then build it below
    showTopFlavors(respObj);
}

// STEP 3b: Call the populate() function
populate(); 

/* STEP 9b: Build out the populateHeader() function */
function populateHeader(jsonObj) {
    // Create the H1 element
    const h1Element = document.createElement("h1");
    // Grab the company name from the JSON object and use it for the text node
    h1Element.innerText = jsonObj.companyName;
    // Inject the complete H1 element into the DOM, inside the HEADER
    headerElement.appendChild(h1Element);
};
/* STEP 10b: Assemble the showTopFlavors() function */
function showTopFlavors(jsonObj) {
    // STEP 10c: Bind the JSON topFlavors object to a var
    var topFlavors = jsonObj.topFlavors;
    // STEP 10d: Loop through the topFlavors object
    for (var i = 0; i < topFlavors.length; i++) {
        const articleElement = document.createElement("article");
        const h2Element = document.createElement("h2");
        const imgElement = document.createElement("img");
        const p1Element = document.createElement("p");
        const p2Element = document.createElement("p");
        const ulElement = document.createElement("ul");

        h2Element.textContent = topFlavors[i].name;
        p1Element.textContent = "Calories: " + topFlavors[i].calories;
        p2Element.textContent = "Type: " + topFlavors[i].type;

        const ingredientsText = document.createElement("p");
        ingredientsText.textContent = "Ingredients: ";
        
        for (var j = 0; j < topFlavors[i].ingredients.length; j++) {
            const liElement = document.createElement("li");
            liElement.textContent = topFlavors[i].ingredients[j];
            ulElement.appendChild(liElement);
        }

        imgElement.setAttribute("src", topFlavors[i].image)

        articleElement.appendChild(h2Element);
        articleElement.appendChild(imgElement);
        articleElement.appendChild(p1Element);
        articleElement.appendChild(p2Element);
        articleElement.appendChild(ingredientsText);
        articleElement.appendChild(ulElement);

        sectionElement.appendChild(articleElement);
    }
    // STEP 10e: build HTML elements for the content: article, h2, image, p1, p2, list


    // STEP 10f: Set the textContent property for each of the above elements (except the UL), based on the JSON content


    // STEP 10g: Build a loop for the ingredients array in the JSON


    // STEP 10i: Append each complete ARTICLE element to the SECTION element
};

// STEP 11: Add a 3rd flavour of ice cream to the local JSON file, making use of the /images/strawberry-sprinkle.svg image

// Lab: Extend the JavaScript application built in class to include two more flavors of ice cream.

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

// A special thanks to https://openclipart.org/detail/285225/ice-cream-cones for the awesome ice cream cone illustrations