this.SalesInvoiceItem = new Mongo.Collection("sales_invoice_item");

this.SalesInvoiceItem.userCanInsert = function(userId, doc) {
	return true;
}

this.SalesInvoiceItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalesInvoiceItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalesInvoiceItem = new SimpleSchema({
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
	image: {
		label: "Image",
		type: String,
		optional: true
	},
	serial_no: {
		label: "Serial Number",
		type: String,
		optional: true
	},
	base_amount: {
		label: "Base Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	expense_account: {
		label: "Expense Account",
		type: String,
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
	dn_detail: {
		label: "DN Detail",
		type: String,
		optional: true
	},
	cost_center: {
		label: "Cost Center",
		type: String,
		optional: true
	},
	so_detail: {
		label: "SO Detail",
		type: String,
		optional: true
	},
	actual_qty: {
		label: "Actual Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	page_break: {
		label: "Page Break",
		type: Number,
		defaultValue: 0
	},
	base_net_rate: {
		label: "Base Net Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	income_account: {
		label: "Income Account",
		type: String,
		optional: true
	},
	item_name: {
		label: "Item Name",
		type: String,
		optional: true
	},
	qty: {
		label: "Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	base_net_amount: {
		label: "Base Net Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	net_rate: {
		label: "Net Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	stock_uom: {
		label: "Stock UOM",
		type: String,
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
	actual_batch_qty: {
		label: "Actual Batch Quantity",
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
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	brand: {
		label: "Brand",
		type: String,
		optional: true
	},
	barcode: {
		label: "Barcode",
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
	time_log_batch: {
		label: "Time Log Batch",
		type: String,
		optional: true
	},
	pricing_rule: {
		label: "Pricing Rule",
		type: String,
		optional: true
	},
	delivered_qty: {
		label: "Delivered Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	price_list_rate: {
		label: "Price List Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	sales_order: {
		label: "Sales Order",
		type: String,
		optional: true
	},
	item_group: {
		label: "Item Group",
		type: String,
		optional: true
	},
	delivery_note: {
		label: "Delivery Note",
		type: String,
		optional: true
	},
	amount: {
		label: "Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	customer_item_code: {
		label: "Customer Item Code",
		type: String,
		optional: true
	},
	batch_no: {
		label: "Batch Number",
		type: String,
		optional: true
	},
	net_amount: {
		label: "Net Amount",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.SalesInvoiceItem.attachSchema(this.Schemas.SalesInvoiceItem);
