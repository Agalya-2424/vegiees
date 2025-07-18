let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.totalAmount');
let quantity = document.querySelector('.quantity');
let placeOrderBtn = document.querySelector('.placeOrderBtn');
let successMessage = document.querySelector('.successMessage');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'Apple',
        image: 'fruits-vegetables-website-images/img/p1.png',
        price: 200
    },
    {
        id: 2,
        name: 'Pumpkin',
        image: 'fruits-vegetables-website-images/img/p2.png',
        price: 150
    },
    {
        id: 3,
        name: 'Carrot',
        image: 'fruits-vegetables-website-images/img/p3.png',
        price: 50
    },
    {
        id: 4,
        name: 'Strawberry',
        image: 'fruits-vegetables-website-images/img/p4.png',
        price: 220
    },
    {
        id: 5,
        name: 'Cherry',
        image: 'fruits-vegetables-website-images/img/p5.png',
        price: 140
    },
    {
        id: 6,
        name: 'Potato',
        image: 'fruits-vegetables-website-images/img/p6.png',
        price: 30
    }
];

let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}" alt="${value.name}">
            <div class="title">${value.name}</div>
            <div class="price">₹${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>
        `;
        list.appendChild(newDiv);
    });
}
initApp();

function addToCard(key) {
    if (!listCards[key]) {
        listCards[key] = { ...products[key], quantity: 1 };
    } else {
        listCards[key].quantity++;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}" alt="${value.name}"/></div>
                <div>${value.name}</div>
                <div>₹${(value.price * value.quantity).toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, qty) {
    if (qty <= 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = qty;
    }
    reloadCard();
}

// ✅ Place Order Logic
placeOrderBtn.addEventListener('click', () => {
    if (listCards.length === 0 || quantity.innerText === '0') {
        alert('🛒 Your cart is empty!');
        return;
    }

    successMessage.style.display = 'block';

    setTimeout(() => {
        // Optional: clear cart before redirect
        listCards = [];
        reloadCard();

        // Redirect to thank you page
        window.location.href = 'thankyou.html';
    }, 2000);
});


