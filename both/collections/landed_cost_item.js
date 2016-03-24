this.LandedCostItem = new Mongo.Collection("landed_cost_item");

this.LandedCostItem.userCanInsert = function(userId, doc) {
	return true;
}

this.LandedCostItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.LandedCostItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.LandedCostItem = new SimpleSchema({
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
	purchase_receipt: {
		label: "Purchase Receipt",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	amount: {
		label: "Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	qty: {
		label: "Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	rate: {
		label: "Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	applicable_charges: {
		label: "Applicable Charges",
		type: Number,
		decimal: true,
		optional: true
	},
	purchase_receipt_item: {
		label: "Purchase Receipt Item",
		type: String,
		optional: true
	}
});

this.LandedCostItem.attachSchema(this.Schemas.LandedCostItem);
