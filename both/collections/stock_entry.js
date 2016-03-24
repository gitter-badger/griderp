this.StockEntry = new Mongo.Collection("stock_entry");

this.StockEntry.userCanInsert = function(userId, doc) {
	return true;
}

this.StockEntry.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.StockEntry.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.StockEntry = new SimpleSchema({
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
	use_multi_level_bom: {
		label: "Use Multi Level BOM",
		type: Number,
		defaultValue: 1
	},
	delivery_note_no: {
		label: "Delivery Note Number",
		type: String,
		optional: true
	},
	supplier_address: {
		label: "Supplier Address",
		type: String,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	fg_completed_qty: {
		label: "FG Completed Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	letter_head: {
		label: "Letter Head",
		type: String,
		optional: true
	},
	project_name: {
		label: "Project Name",
		type: String,
		optional: true
	},
	purchase_receipt_no: {
		label: "Purchase Receipt Number",
		type: String,
		optional: true
	},
	difference_account: {
		label: "Difference Account",
		type: String,
		optional: true
	},
	posting_time: {
		label: "Posting Time",
		type: String,
		optional: true
	},
	customer_name: {
		label: "Customer Name",
		type: String,
		optional: true
	},
	from_warehouse: {
		label: "From Warehouse",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	purchase_order: {
		label: "Purchase Order",
		type: String,
		optional: true
	},
	from_bom: {
		label: "From BOM",
		type: Number,
		defaultValue: 0
	},
	to_warehouse: {
		label: "To Warehouse",
		type: String,
		optional: true
	},
	supplier: {
		label: "Supplier",
		type: String,
		optional: true
	},
	value_difference: {
		label: "Value Difference",
		type: Number,
		decimal: true,
		optional: true
	},
	credit_note: {
		label: "Credit Note",
		type: String,
		optional: true
	},
	sales_invoice_no: {
		label: "Sales Invoice Number",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	bom_no: {
		label: "BOM Number",
		type: String,
		optional: true
	},
	customer_address: {
		label: "Customer Address",
		type: String,
		optional: true
	},
	purpose: {
		label: "Purpose",
		type: String,
		optional: true,
		defaultValue: "Material Issue"
	},
	supplier_name: {
		label: "Supplier Name",
		type: String,
		optional: true
	},
	remarks: {
		label: "Remarks",
		type: String,
		optional: true
	},
	total_additional_costs: {
		label: "Total Additional Costs",
		type: Number,
		decimal: true,
		optional: true
	},
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	total_amount: {
		label: "Total Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	total_incoming_value: {
		label: "Total Incoming Value",
		type: Number,
		decimal: true,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	select_print_heading: {
		label: "Select Print Heading",
		type: String,
		optional: true
	},
	posting_date: {
		label: "Posting Date",
		type: Date,
		optional: true
	},
	production_order: {
		label: "Production Order",
		type: String,
		optional: true
	},
	total_outgoing_value: {
		label: "Total Outgoing Value",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.StockEntry.attachSchema(this.Schemas.StockEntry);
