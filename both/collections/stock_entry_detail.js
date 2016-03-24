this.StockEntryDetail = new Mongo.Collection("stock_entry_detail");

this.StockEntryDetail.userCanInsert = function(userId, doc) {
	return true;
}

this.StockEntryDetail.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.StockEntryDetail.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.StockEntryDetail = new SimpleSchema({
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
	t_warehouse: {
		label: "T Warehouse",
		type: String,
		optional: true
	},
	transfer_qty: {
		label: "Transfer Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	basic_amount: {
		label: "Basic Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	serial_no: {
		label: "Serial Number",
		type: String,
		optional: true
	},
	qty: {
		label: "Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	cost_center: {
		label: "Cost Center",
		type: String,
		optional: true
	},
	actual_qty: {
		label: "Actual Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	material_request_item: {
		label: "Material Request Item",
		type: String,
		optional: true
	},
	stock_uom: {
		label: "Stock UOM",
		type: String,
		optional: true
	},
	item_name: {
		label: "Item Name",
		type: String,
		optional: true
	},
	additional_cost: {
		label: "Additional Cost",
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
	image: {
		label: "Image",
		type: String,
		optional: true
	},
	uom: {
		label: "UOM",
		type: String,
		optional: true
	},
	basic_rate: {
		label: "Basic Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	barcode: {
		label: "Barcode",
		type: String,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	material_request: {
		label: "Material Request",
		type: String,
		optional: true
	},
	expense_account: {
		label: "Expense Account",
		type: String,
		optional: true
	},
	bom_no: {
		label: "BOM Number",
		type: String,
		optional: true
	},
	s_warehouse: {
		label: "S Warehouse",
		type: String,
		optional: true
	},
	amount: {
		label: "Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	batch_no: {
		label: "Batch Number",
		type: String,
		optional: true
	},
	valuation_rate: {
		label: "Valuation Rate",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.StockEntryDetail.attachSchema(this.Schemas.StockEntryDetail);
