this.ItemTax = new Mongo.Collection("item_tax");

this.ItemTax.userCanInsert = function(userId, doc) {
	return true;
}

this.ItemTax.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ItemTax.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ItemTax = new SimpleSchema({
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
	tax_type: {
		label: "Tax Type",
		type: String,
		optional: true
	},
	tax_rate: {
		label: "Tax Rate",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.ItemTax.attachSchema(this.Schemas.ItemTax);
