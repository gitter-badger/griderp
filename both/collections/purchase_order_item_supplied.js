this.PurchaseOrderItemSupplied = new Mongo.Collection("purchase_order_item_supplied");

this.PurchaseOrderItemSupplied.userCanInsert = function(userId, doc) {
	return true;
}

this.PurchaseOrderItemSupplied.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PurchaseOrderItemSupplied.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PurchaseOrderItemSupplied = new SimpleSchema({
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
	rm_item_code: {
		label: "RM Item Code",
		type: String,
		optional: true
	},
	required_qty: {
		label: "Required Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	reference_name: {
		label: "Reference Name",
		type: String,
		optional: true
	},
	conversion_factor: {
		label: "Conversion Factor",
		type: Number,
		decimal: true,
		optional: true
	},
	amount: {
		label: "Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	main_item_code: {
		label: "Main Item Code",
		type: String,
		optional: true
	},
	rate: {
		label: "Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	stock_uom: {
		label: "Stock UOM",
		type: String,
		optional: true
	},
	bom_detail_no: {
		label: "BOM Detail Number",
		type: String,
		optional: true
	}
});

this.PurchaseOrderItemSupplied.attachSchema(this.Schemas.PurchaseOrderItemSupplied);
