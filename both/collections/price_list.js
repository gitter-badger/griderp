this.PriceList = new Mongo.Collection("price_list");

this.PriceList.userCanInsert = function(userId, doc) {
	return true;
}

this.PriceList.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PriceList.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PriceList = new SimpleSchema({
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
	selling: {
		label: "Selling",
		type: Number,
		defaultValue: 0
	},
	currency: {
		label: "Currency",
		type: String,
		optional: true
	},
	enabled: {
		label: "Enabled",
		type: Number,
		defaultValue: 1
	},
	price_list_name: {
		label: "Price List Name",
		type: String,
		optional: true
	},
	buying: {
		label: "Buying",
		type: Number,
		defaultValue: 0
	}
});

this.PriceList.attachSchema(this.Schemas.PriceList);
