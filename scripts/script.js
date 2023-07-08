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

// Create a variable to store the order objects
var cart = []
var orderLimit = 6;

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
    const order = {
        orderNumber: cart.length + 1,
        size: size,
        crust: crust,
        toppings: toppings,
        isSpicy: isSpicy
    }

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