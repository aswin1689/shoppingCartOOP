import Cart from './Cart';
import Item from './Item';
import items from './items.json';
import './app.scss';

let myCart = new Cart();
let milk = new Item('milk', 1.99);
myCart.addItem(milk);
let bread = new Item('bread', 1.5);
myCart.addItem(bread);
myCart.addItem(bread);
let cereal = new Item('cereal', 4);
myCart.addItem(cereal);
myCart.reduceQuantity(bread);
myCart.removeItem(bread);
myCart.addItem(cereal);
let towel = new Item('towel', 5.5);
myCart.addItem(towel);
myCart.removeItem(cereal);
console.log(myCart);
let itemsTable;

const generateTable = () => {
	document.body.insertAdjacentHTML(
		'afterbegin',
		'<table><thead><tr><td>Name</td><td>Price</td></tr></thead><tbody></tbody></table>'
	);

	itemsTable = document.getElementsByTagName('table')[0];
	itemsTable.setAttribute('id', 'items-table');
	itemsTable.insertAdjacentHTML('beforebegin', '<h2>Items list</h2>');
	itemsTable.insertAdjacentHTML('afterend', '<h2>Cart</h2>');
};

const displayItems = () => {
	let tableBody = itemsTable.querySelector('tbody');
	items.forEach(item => {
		tableBody.insertAdjacentHTML(
			'beforeend',
			`<tr><td>${item.name}</td><td>${item.price}</td></tr>`
		);
	});
};

const generateCart = () => {
	let cartTitle = document.getElementsByTagName('h2')[1];
	cartTitle.insertAdjacentHTML('afterend', '<div id="cart"></div>');
	let cartEl = document.getElementById('cart');
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
		<div>Total: $${myCart.getTotal()}</div>
	</div>`
	);
};

const displayCart = () => {
	let items = myCart.getItems();
};

generateTable();
displayItems();
generateCart();
displayCart();
