this.ItemPrice = new Mongo.Collection("item_price");

this.ItemPrice.userCanInsert = function(userId, doc) {
	return true;
}

this.ItemPrice.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ItemPrice.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ItemPrice = new SimpleSchema({
	name: {
		label: "Name",
		type: String
	},
	docstatus: {
		label: "Doc Status",
		type: Number,
		optional: true,
		defaultValue: 0
	},
	parent: {
		label: "Parent",
		type: String,
		optional: true
	},
	parentfield: {
		label: "Parent Field",
		type: String,
		optional: true
	},
	parenttype: {
		label: "Parent Type",
		type: String,
		optional: true
	},
	idx: {
		label: "Index",
		type: Number,
		optional: true
	},
	price_list_rate: {
		label: "Price List Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	selling: {
		label: "Selling",
		type: Number,
		defaultValue: 0
	},
	buying: {
		label: "Buying",
		type: Number,
		defaultValue: 0
	},
	item_name: {
		label: "Item Name",
		type: String,
		optional: true
	},
	price_list: {
		label: "Price List",
		type: String,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	currency: {
		label: "Currency",
		type: String,
		optional: true
	},
	item_description: {
		label: "Item Description",
		type: String,
		optional: true
	}
});

this.ItemPrice.attachSchema(this.Schemas.ItemPrice);
