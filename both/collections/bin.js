this.Bin = new Mongo.Collection("bin");

this.Bin.userCanInsert = function(userId, doc) {
	return true;
}

this.Bin.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Bin.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Bin = new SimpleSchema({
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
	valuation_rate: {
		label: "Valuation Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	fcfs_rate: {
		label: "FCFS Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	reserved_qty: {
		label: "Reserved Quantity",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	planned_qty: {
		label: "Planned Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	ma_rate: {
		label: "MA Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	projected_qty: {
		label: "Projected Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	indented_qty: {
		label: "Intended Quantity",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	stock_uom: {
		label: "Stock UOM",
		type: String,
		optional: true
	},
	ordered_qty: {
		label: "Ordered Quantity",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	warehouse: {
		label: "Warehouse",
		type: String,
		optional: true
	},
	stock_value: {
		label: "Stock Value",
		type: Number,
		decimal: true,
		optional: true
	},
	actual_qty: {
		label: "Actual Quantity",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	}
});

this.Bin.attachSchema(this.Schemas.Bin);
