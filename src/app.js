import Cart from './Cart';
import Item from './Item';
import items from './items.json';
import './app.scss';

let myCart = new Cart();
let itemsTable, cartEl;

function itemRowClick(event) {
	let dataset = event.target.parentNode.dataset;
	myCart.addItem(
		new Item(dataset['name'], parseInt(dataset['price']).toFixed(2))
	);
	let cartTotalEl = document.getElementById('cart-total');
	cartTotalEl.innerText = myCart.getTotal().toFixed(2);
	displayCartItems();
}

const generateTable = () => {
	document.body.insertAdjacentHTML(
		'afterbegin',
		'<table><thead><tr><td>Name</td><td>Price</td></tr></thead><tbody></tbody></table>'
	);

	itemsTable = document.getElementsByTagName('table')[0];
	itemsTable.setAttribute('id', 'items-table');
	itemsTable.insertAdjacentHTML('beforebegin', '<h2>Items list</h2>');
	itemsTable.insertAdjacentHTML('afterend', '<h2>Cart</h2>');
	itemsTable.querySelector('tbody').addEventListener('click', itemRowClick);
};

const displayItems = () => {
	let tableBody = itemsTable.querySelector('tbody');
	items.forEach(item => {
		tableBody.insertAdjacentHTML(
			'beforeend',
			`<tr data-name=${item.name} data-price='${item.price}'><td>${
				item.name
			}</td><td>${parseInt(item.price).toFixed(2)}</td></tr>`
		);
	});
};

const removeItemFromCart = () => {
	let itemName = event.target.closest('.cart-row').dataset['name'];
	myCart.removeItem(itemName);
	displayCartItems();
	let cartTotalEl = document.getElementById('cart-total');
	cartTotalEl.innerText = myCart.getTotal().toFixed(2);
};

const updateItemQuantity = () => {
	let itemName = event.target.closest('.cart-row').dataset['name'];
	let itemQuantity = parseInt(event.target.previousSibling.previousSibling.value);
	myCart.updateQuantity(itemName, itemQuantity);
	let cartTotalEl = document.getElementById('cart-total');
	cartTotalEl.innerText = myCart.getTotal().toFixed(2);
};

const onCartRowClick = event => {
	if (event.target.dataset.action == 'remove') {
		removeItemFromCart();
	} else if (event.target.dataset.action == 'update') {
		updateItemQuantity();
	}
};

const generateCart = () => {
	let cartTitle = document.getElementsByTagName('h2')[1];
	cartTitle.insertAdjacentHTML('afterend', '<div id="cart"></div>');
	cartEl = document.getElementById('cart');
	cartEl.insertAdjacentHTML(
		'afterbegin',
		`
		<div id="cart-header">
			<div>Name</div>
			<div>Price</div>
			<div>Quantity</div>
			<div>Options</div>
	</div>`
	);
	cartEl.insertAdjacentHTML(
		'beforeend',
		`
	<div>
		<div id="cart-rows"></div>
		<div id="total-row">Total: $<span id="cart-total">${myCart
			.getTotal()
			.toFixed(2)}</span></div>
	</div>`
	);
	cartEl
		.querySelector('#cart-rows')
		.addEventListener('click', onCartRowClick);
};

const displayCartItems = () => {
	let items = myCart.getItems();
	let cartRowsContainer = cartEl.querySelector('#cart-rows');
	cartRowsContainer.textContent = '';
	items.forEach(item => {
		cartRowsContainer.insertAdjacentHTML(
			'beforeend',
			`
			<div class="cart-row" data-name="${item.name}">
				<div class="item-name-col">${item.name}</div>
				<div>$${parseInt(item.price).toFixed(2)}</div>
				<div>
					<input type="number" min="0" max="10" value="${item.quantity}">
					<button data-action="update">update</button>
				</div>
				<button data-action="remove">Remove Item</button>
			</div>
		`
		);
	});
};

generateTable();
displayItems();
generateCart();
displayCartItems();
