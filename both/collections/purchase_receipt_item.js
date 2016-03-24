this.PurchaseReceiptItem = new Mongo.Collection("purchase_receipt_item");

this.PurchaseReceiptItem.userCanInsert = function(userId, doc) {
	return true;
}

this.PurchaseReceiptItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PurchaseReceiptItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PurchaseReceiptItem = new SimpleSchema({
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
	barcode: {
		label: "Barcode",
		type: String,
		optional: true
	},
	qty: {
		label: "Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	item_tax_rate: {
		label: "Item Tax Rate",
		type: String,
		optional: true
	},
	rate: {
		label: "Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	cost_center: {
		label: "Cost Center",
		type: String,
		optional: true
	},
	received_qty: {
		label: "Received Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	stock_uom: {
		label: "Stock UOM",
		type: String,
		optional: true
	},
	item_tax_amount: {
		label: "Item Tax Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	pricing_rule: {
		label: "Pricing Rule",
		type: String,
		optional: true
	},
	rejected_warehouse: {
		label: "Rejected Warehouse",
		type: String,
		optional: true
	},
	base_net_rate: {
		label: "Base Net Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	discount_percentage: {
		label: "Discount Percentage",
		type: Number,
		decimal: true,
		optional: true
	},
	item_name: {
		label: "Item Name",
		type: String,
		optional: true
	},
	brand: {
		label: "Brand",
		type: String,
		optional: true
	},
	base_net_amount: {
		label: "Base Net Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	prevdoc_detail_docname: {
		label: "Prevdoc Detail Docname",
		type: String,
		optional: true
	},
	net_rate: {
		label: "Net Rate",
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
	qa_no: {
		label: "QA Number",
		type: String,
		optional: true
	},
	stock_qty: {
		label: "Stock Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	base_price_list_rate: {
		label: "Base Price List Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	warehouse: {
		label: "Warehouse",
		type: String,
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
	project_name: {
		label: "Project Name",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	prevdoc_docname: {
		label: "Prevdoc Docname",
		type: String,
		optional: true
	},
	landed_cost_voucher_amount: {
		label: "Landed Cost Voucher Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	rm_supp_cost: {
		label: "RM Support Cost",
		type: Number,
		decimal: true,
		optional: true
	},
	rejected_serial_no: {
		label: "Rejected Serial Number",
		type: String,
		optional: true
	},
	base_rate: {
		label: "Base Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	base_amount: {
		label: "Base Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	rejected_qty: {
		label: "Rejected Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	schedule_date: {
		label: "Schedule Date",
		type: Date,
		optional: true
	},
	price_list_rate: {
		label: "Price List Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	serial_no: {
		label: "Serial Number",
		type: String,
		optional: true
	},
	page_break: {
		label: "Page Break",
		type: Number,
		defaultValue: 0
	},
	item_group: {
		label: "Item Group",
		type: String,
		optional: true
	},
	amount: {
		label: "Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	bom: {
		label: "BOM",
		type: String,
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
	},
	net_amount: {
		label: "Net Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	prevdoc_doctype: {
		label: "Prevdoc Doctype",
		type: String,
		optional: true
	}
});

this.PurchaseReceiptItem.attachSchema(this.Schemas.PurchaseReceiptItem);
