// Get all the main elements
const formComponent = document.querySelector('#form-component');
const menuComponent = document.querySelector('#menu-component');
const cartComponent = document.querySelector('#cart-component');

// Get all the buttons
const orderButton = document.querySelector('#order-button');
const cartButton = document.querySelector('#cart-button');

const backButtons = document.querySelectorAll('.back');

const form = document.querySelector("form");

const orderContainer = document.querySelector("#order-container");

const infoElement = document.querySelector("#info");

// Dynamically adding my name and studentd id
setTimeout(() => {
    infoElement.innerHTML += "Hi there, my name is David";

    setTimeout(() => {
        infoElement.innerHTML += "<br>";
        infoElement.innerHTML += "By the way... here is my student ID - 200471230";
    }, 2000)
}, 2000);

// Create a variable to store the order objects
var cart = []
var orderLimit = 6;

// Create an Order class
function Order(orderNumber, size, crust, toppings, isSpicy) {
    this.orderNumber = orderNumber;
    this.size = size;
    this.crust = crust;
    this.toppings = toppings;
    this.isSpicy = isSpicy;
}

// Display the menu componenet
menuComponent.style.display = "flex";


// Create event listeners accordingly
orderButton.addEventListener('click', () => {
    menuComponent.style.display = "none";
    formComponent.style.display = "flex";
})

cartButton.addEventListener('click', () => {
    menuComponent.style.display = "none";
    cartComponent.style.display = "flex";
})

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (cart.length >= orderLimit) {
        alert("You have reached the order limit of " + orderLimit + " orders. Please checkout to continue ordering.");
        return;
    }

    // Get values from the input fields
    const size = document.querySelector("#size").value;
    const crust = document.querySelector("#crust").value;

    const toppings = [];
    const toppingsElements = document.querySelectorAll("input[class='topping']:checked");
    toppingsElements.forEach((topping) => {
        toppings.push(topping.value);
    })

    // Check the isSpicy radio button
    const isSpicy = document.querySelector("input[name='spicy']:checked").value;

    // Log all the values to the console
    console.log(size);
    console.log(crust);
    console.log(toppings);
    console.log(isSpicy);

    // Create a new order object
    const order = new Order(cart.length + 1, size, crust, toppings, isSpicy);

    cart.push(order);

    updateCart();

    formComponent.style.display = "none";
    cartComponent.style.display = "flex";
})

// Create event listener for the back buttons
backButtons.forEach((button) => {
    button.addEventListener('click', () => {
        menuComponent.style.display = "flex";
        formComponent.style.display = "none";
        cartComponent.style.display = "none";
    })
})

// Create a function to update the cart
function updateCart() {

    if(cart.length == 1) {
        orderContainer.textContent = "";
    }
    else if(cart.length == 0) {
        console.log("Triggered");
        orderContainer.textContent = "...";
    }

    orderContainer.innerHTML = "";

    cart.forEach((order) => {
        const orderElement = document.createElement("div");
        orderElement.classList.add("order-element");


        // Create a header container for a better layout (allows for the remove button to be on the same line as the order number)
        const headerContainer = document.createElement("div");
        headerContainer.classList.add("header-container");

        // Create wrappers for the remove button and order number
        const removeButtonWrapper = document.createElement("div");
        removeButtonWrapper.classList.add("remove-button-wrapper")
        const orderNumberElementWrapper = document.createElement("div");
        orderNumberElementWrapper.classList.add("order-number-wrapper");

        const removeButton = document.createElement("button");
        removeButton.innerHTML = "X";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener('click', removeButtonEvent);
        orderElement.appendChild(removeButton);

        // Wrap out remove button
        removeButtonWrapper.appendChild(removeButton);
        headerContainer.appendChild(removeButtonWrapper);

        const orderNumberElement = document.createElement("h4");
        orderNumberElement.innerHTML = "Order #" + order.orderNumber;
        orderElement.appendChild(orderNumberElement);

        // Wrap our order number
        orderNumberElementWrapper.appendChild(orderNumberElement);
        headerContainer.appendChild(orderNumberElementWrapper);

        // Add the header container to the order element
        orderElement.appendChild(headerContainer);

        const sizeElement = document.createElement("p");
        sizeElement.innerHTML = "Size: " + order.size;
        orderElement.appendChild(sizeElement);

        const crustElement = document.createElement("p");
        crustElement.innerHTML = "Crust: " + order.crust;
        orderElement.appendChild(crustElement);

        const toppingsElement = document.createElement("p");
        if(order.toppings.length == 0) {
            toppingsElement.innerHTML = "Toppings: None";
        }
        else {
            toppingsElement.innerHTML = "Toppings: " + order.toppings.join(", ");
        }
        orderElement.appendChild(toppingsElement);

        const isSpicyElement = document.createElement("p");
        isSpicyElement.innerHTML = "Is Spicy: " + order.isSpicy;
        orderElement.appendChild(isSpicyElement);

        const priceElement = document.createElement("p");
        priceElement.innerHTML = "Price: $" + calculatePrice(order);
        orderElement.appendChild(priceElement);

        orderContainer.appendChild(orderElement);
    });

}

// Event listerner for removing an order
function removeButtonEvent(e) {
    const orderElement = e.target.parentElement.parentElement.parentElement;
    const orderNumber = orderElement.querySelector("h4").innerHTML;
    const orderNumberInt = parseInt(orderNumber.substring(7, orderNumber.length));
    console.log(orderNumberInt);

    cart.splice(orderNumberInt - 1, 1);

    console.log(cart.length)

    updateCart();
}

const calculatePrice = (order) => {

    const size = order.size;
    const crust = order.crust;
    const toppings = order.toppings;
    const isSpicy = order.isSpicy;

    console.log('====================================');
    console.log(isSpicy);
    console.log('====================================');

    var price = 0;

    switch(size) {
        case "small":
            price += 5;
            break;
        case "medium":
            price += 7;
            break;
        case "large":
            price += 9;
            break;
        case "extra-large":
            price += 12;
            break;
    }

    switch(crust) {
        case "thin":
            price += 0;
            break;
        case "thick":
            price += 1;
            break;
        case "cheese-stuffed":
            price += 2;
            break;
        case "garlic-bread":
            price += 2;
            break;
    }

    if(toppings.length > 0) {
        price += toppings.length * 0.5;
    }

    if(isSpicy == "yes") {
        price += 1;
    }

    return price;

};