export default class Cart {
	constructor() {
		this.items = [];
		this.total = 0;
	}

	addItem(newItem) {
		console.log('old cart', this.items);
		let sameItem = this.items.filter(item => item.name == newItem.name);
		if (sameItem.length > 0) {
			const updatedItem = {
				...sameItem[0],
				quantity: sameItem[0].quantity + 1
			};
			this.items = [
				...this.items.filter(item => item.name !== newItem.name),
				updatedItem
			];
		} else {
			this.items = [...this.items, newItem];
		}
		console.log('new cart', this.items);
	}

	getItems() {
		return this.items;
	}

	getTotal() {
		this.items.forEach(item => {
			this.total += item.quantity * item.price;
		});
		return this.total;
	}

	removeItem(itemToRemove) {
		this.items = [
			...this.items.filter(item => {
				return item.name != itemToRemove.name;
			})
		];
	}

	reduceQuantity(itemToRemove) {
		this.items = this.items.map(item => {
			if (item.name == itemToRemove.name)
				return { ...item, quantity: item.quantity - 1 };
			else return { ...item };
		});
	}
}
