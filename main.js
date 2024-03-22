let order = [];

function addItem(item, price) {
    const existingItem = order.find(orderItem => orderItem.item === item);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        order.push({ item, price, quantity: 1 });
    }
    updateOrderList();
}

function updateOrderList() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
    let total = 0;
    order.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item.item} - ${item.price} peso each</span>
            <button onclick="decreaseQuantity(${index})">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQuantity(${index})">+</button>
            <button onclick="deleteItem(${index})">remove</button>
            <span>${item.price * item.quantity} pesos</span>
        `;
        orderList.appendChild(listItem);
        total += item.price * item.quantity;
    });
    orderList.innerHTML += `<li><strong>Total: ${total} peso</strong></li>`;
}

function finalizeOrder() {
    if (order.length === 0) {
        alert('Please add items to the order.');
        return;
    }
    const confirmation = confirm('Take your order now?');
    if (confirmation) {
        alert('Order completed! Please kindly wait for your order ^^');
        order = [];
        updateOrderList();
    }
}

function increaseQuantity(index) {
    if (index >= 0 && index < order.length) {
        order[index].quantity++;
        updateOrderList();
    }
}

function decreaseQuantity(index) {
    if (index >= 0 && index < order.length && order[index].quantity > 1) {
        order[index].quantity--;
        updateOrderList();
    }
}

function deleteItem(index) {
    if (index >= 0 && index < order.length) {
        order.splice(index, 1);
        updateOrderList();
    }
}
