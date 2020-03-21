import Cart from './Cart';
import Item from './Item';
import items from './items.json';
import './app.scss';

let myCart = new Cart();
console.log(myCart);
let itemsTable, cartEl;

function itemRowClick(event) {
	console.log(event.target.parentNode.dataset);
	let dataset = event.target.parentNode.dataset;
	console.log('dataset', dataset['price']);
	myCart.addItem(new Item(dataset['name'], dataset['price']));
	let cartTotalEl = document.getElementById('cart-total');
	cartTotalEl.innerText = myCart.getTotal();
	displayCart();
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
			`<tr data-name=${item.name} data-price='${item.price}'><td>${item.name}</td><td>${item.price}</td></tr>`
		);
	});
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
			<div>sub-total</div>
	</div>`
	);
	cartEl.insertAdjacentHTML(
		'beforeend',
		`
	<div>
		<div id="cart-rows"></div>
		<div id="total-row">Total: $<span id="cart-total">${myCart.getTotal()}</span></div>
	</div>`
	);
};

const displayCart = () => {
	let items = myCart.getItems();
	let cartRowsContainer = cartEl.querySelector('#cart-rows');
	cartRowsContainer.textContent = '';
	items.forEach(item => {
		cartRowsContainer.insertAdjacentHTML(
			'beforeend',
			`
			<div class="cart-row">
				<div>${item.name}</div>
				<div>${item.price}</div>
				<input type="number" value="${item.quantity}">
				<button>Remove Item</button>
			</div>
		`
		);
	});
};

generateTable();
displayItems();
generateCart();
displayCart();
