const Products = [
    { id: 1, name: "Product-1", price: 100 },
    { id: 2, name: "Product-2", price: 200 },
    { id: 3, name: "Product-3", price: 300 }
];

let cart = {}; // Store product counts

function displayPro() {
    let item_con = document.querySelector(".left");
    item_con.innerHTML = "<h1>Products</h1>";

    Products.forEach(product => {
        let card = document.createElement("div");
        card.classList.add("product_item");
        card.innerHTML = `
            <p>${product.name}</p>
            <p>Price: $${product.price}</p>
            <div class="incre_con">
                <i class="fa-solid fa-minus" onclick="removeFromCart(${product.id})"></i>
                <span id="count-${product.id}">0</span>
                <i class="fa-solid fa-plus" onclick="addToCart(${product.id})"></i>
            </div>
        `;
        item_con.appendChild(card);
    });
}

function addToCart(id) {
    if (!cart[id]) {
        cart[id] = { ...Products.find(p => p.id === id), quantity: 0 };
    }
    cart[id].quantity++;

    document.getElementById(`count-${id}`).innerText = cart[id].quantity;
    updateCartUI();
}

function removeFromCart(id) {
    if (cart[id]) {
        cart[id].quantity--;
        if (cart[id].quantity === 0) {
            delete cart[id];
        }
    }

    document.getElementById(`count-${id}`).innerText = cart[id] ? cart[id].quantity : 0;
    updateCartUI();
}

function updateCartUI() {
    let cartContainer = document.querySelector(".right");
    cartContainer.innerHTML = "<h1>Cart</h1>";
    
    let totalPrice = 0;
    Object.values(cart).forEach(item => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart_item");
        cartItem.innerHTML = `
            <p>${item.name} (${item.quantity})</p>
            <p>$${item.price * item.quantity}</p>
        `;
        cartContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    if (totalPrice > 0) {
        let totalDiv = document.createElement("div");
        totalDiv.classList.add("total")
        totalDiv.innerHTML = `<h2>Total: $${totalPrice}</h2>`;
        cartContainer.appendChild(totalDiv);
    }
}

displayPro();
