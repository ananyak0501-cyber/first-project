let products = [
    { 
        id: 1, 
        name: "Shirt", 
        price: 500, 
        img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300" 
    },
    { 
        id: 2, 
        name: "Shoes", 
        price: 1000, 
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300" 
    },
    { 
        id: 3, 
        name: "Watch", 
        price: 1500, 
        img: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=300" 
    }
];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
    let productDiv = document.getElementById("products");
    productDiv.innerHTML = "";

    products.forEach(p => {
        let div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;

        productDiv.appendChild(div);
    });
}

function addToCart(id) {
    let item = cart.find(p => p.id === id);

    if (item) {
        item.qty += 1;
    } else {
        let product = products.find(p => p.id === id);
        cart.push({ ...product, qty: 1 });
    }

    updateCart();
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}
function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    let cartList = document.getElementById("cart");
    let total = 0;

    cartList.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.qty;

        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₹${item.price} × ${item.qty}
            <button onclick="removeItem(${item.id})">❌</button>
        `;
        cartList.appendChild(li);
    });

    document.getElementById("total").innerText = total;
}

function clearCart() {
    cart = [];
    updateCart();
}

displayProducts();
displayCart();



 