this.StockReconciliationItem = new Mongo.Collection("stock_reconciliation_item");

this.StockReconciliationItem.userCanInsert = function(userId, doc) {
	return true;
}

this.StockReconciliationItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.StockReconciliationItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.StockReconciliationItem = new SimpleSchema({
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
	current_qty: {
		label: "Current Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	valuation_rate: {
		label: "Valuation Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	warehouse: {
		label: "Warehouse",
		type: String,
		optional: true
	},
	current_valuation_rate: {
		label: "Current Valuation Rate",
		type: String,
		optional: true
	},
	qty: {
		label: "Quantity",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.StockReconciliationItem.attachSchema(this.Schemas.StockReconciliationItem);
