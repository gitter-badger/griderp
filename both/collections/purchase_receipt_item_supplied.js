this.PurchaseReceiptItemSupplied = new Mongo.Collection("purchase_receipt_item_supplied");

this.PurchaseReceiptItemSupplied.userCanInsert = function(userId, doc) {
	return true;
}

this.PurchaseReceiptItemSupplied.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PurchaseReceiptItemSupplied.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PurchaseReceiptItemSupplied = new SimpleSchema({
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
	rm_item_code: {
		label: "RM Item Code",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	rate: {
		label: "Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	conversion_factor: {
		label: "Conversion Factor",
		type: Number,
		decimal: true,
		optional: true
	},
	reference_name: {
		label: "Reference Name",
		type: String,
		optional: true
	},
	serial_no: {
		label: "Serial Number",
		type: String,
		optional: true
	},
	required_qty: {
		label: "Required Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	main_item_code: {
		label: "Main Item Code",
		type: String,
		optional: true
	},
	amount: {
		label: "Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	stock_uom: {
		label: "Stock UOM",
		type: String,
		optional: true
	},
	current_stock: {
		label: "Current Stock",
		type: Number,
		decimal: true,
		optional: true
	},
	batch_no: {
		label: "Batch Number",
		type: String,
		optional: true
	},
	consumed_qty: {
		label: "Consumed Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	bom_detail_no: {
		label: "BOM Detail Number",
		type: String,
		optional: true
	}
});

this.PurchaseReceiptItemSupplied.attachSchema(this.Schemas.PurchaseReceiptItemSupplied);
