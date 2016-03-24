this.StockLedgerEntry = new Mongo.Collection("stock_ledger_entry");

this.StockLedgerEntry.userCanInsert = function(userId, doc) {
	return true;
}

this.StockLedgerEntry.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.StockLedgerEntry.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.StockLedgerEntry = new SimpleSchema({
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
	serial_no: {
		label: "Serial Number",
		type: String,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	voucher_type: {
		label: "Voucher Type",
		type: String,
		optional: true
	},
	voucher_no: {
		label: "Voucher Number",
		type: String,
		optional: true
	},
	actual_qty: {
		label: "Actual Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	stock_value: {
		label: "Stock Value",
		type: Number,
		decimal: true,
		optional: true
	},
	posting_time: {
		label: "Posting Time",
		type: String,
		optional: true
	},
	incoming_rate: {
		label: "Incoming Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	voucher_detail_no: {
		label: "Voucher Detail Number",
		type: String,
		optional: true
	},
	stock_uom: {
		label: "Stock UOM",
		type: String,
		optional: true
	},
	warehouse: {
		label: "Warehouse",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	outgoing_rate: {
		label: "Outgoing Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	stock_queue: {
		label: "Stock Queue",
		type: String,
		optional: true
	},
	valuation_rate: {
		label: "Valuation Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	is_cancelled: {
		label: "Is Cancelled",
		type: String,
		optional: true
	},
	qty_after_transaction: {
		label: "Quantity After Transaction",
		type: Number,
		decimal: true,
		optional: true
	},
	project: {
		label: "Project",
		type: String,
		optional: true
	},
	batch_no: {
		label: "Batch Number",
		type: String,
		optional: true
	},
	stock_value_difference: {
		label: "Stock Value Difference",
		type: Number,
		decimal: true,
		optional: true
	},
	posting_date: {
		label: "Posting Date",
		type: Date,
		optional: true
	}
});

this.StockLedgerEntry.attachSchema(this.Schemas.StockLedgerEntry);
