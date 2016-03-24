this.SupplierQuotation = new Mongo.Collection("supplier_quotation");

this.SupplierQuotation.userCanInsert = function(userId, doc) {
	return true;
}

this.SupplierQuotation.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SupplierQuotation.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SupplierQuotation = new SimpleSchema({
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
	address_display: {
		label: "Address Display",
		type: String,
		optional: true
	},
	supplier_address: {
		label: "Supplier Address",
		type: String,
		optional: true
	},
	supplier_name: {
		label: "Supplier Name",
		type: String,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	net_total: {
		label: "Net Total",
		type: Number,
		decimal: true,
		optional: true
	},
	currency: {
		label: "Currency",
		type: String,
		optional: true
	},
	conversion_rate: {
		label: "Conversion Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	base_taxes_and_charges_deducted: {
		label: "Base Taxes and Charges Deducted",
		type: Number,
		decimal: true,
		optional: true
	},
	taxes_and_charges_added: {
		label: "Taxes and Charges Added",
		type: Number,
		decimal: true,
		optional: true
	},
	total: {
		label: "Total",
		type: Number,
		decimal: true,
		optional: true
	},
	is_subcontracted: {
		label: "Is Subcontracted",
		type: String,
		optional: true,
		defaultValue: "No"
	},
	price_list_currency: {
		label: "Price List Currency",
		type: String,
		optional: true
	},
	base_total: {
		label: "Base Total",
		type: Number,
		decimal: true,
		optional: true
	},
	transaction_date: {
		label: "Transaction Date",
		type: Date,
		optional: true
	},
	base_taxes_and_charges_added: {
		label: "Base Taxes and Charges Added",
		type: Number,
		decimal: true,
		optional: true
	},
	tc_name: {
		label: "TC Name",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	total_taxes_and_charges: {
		label: "Total Taxes and Charges",
		type: Number,
		decimal: true,
		optional: true
	},
	contact_display: {
		label: "Contact Display",
		type: String,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	supplier: {
		label: "Supplier",
		type: String,
		optional: true
	},
	buying_price_list: {
		label: "Buying Price List",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	status: {
		label: "Status",
		type: String,
		optional: true
	},
	letter_head: {
		label: "Letter Head",
		type: String,
		optional: true
	},
	terms: {
		label: "Terms",
		type: String,
		optional: true
	},
	ignore_pricing_rule: {
		label: "Ignore Pricing Rule",
		type: Number,
		defaultValue: 0
	},
	taxes_and_charges: {
		label: "Taxes and Charges",
		type: String,
		optional: true
	},
	base_net_total: {
		label: "Base Net Total",
		type: Number,
		decimal: true,
		optional: true
	},
	base_discount_amount: {
		label: "Base Discount Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	base_rounded_total: {
		label: "Base Rounded Total",
		type: Number,
		decimal: true,
		optional: true
	},
	base_total_taxes_and_charges: {
		label: "Base Total Taxes and Charges",
		type: Number,
		decimal: true,
		optional: true
	},
	contact_mobile: {
		label: "Contact Mobile",
		type: String,
		optional: true
	},
	base_in_words: {
		label: "Base In Words",
		type: String,
		optional: true
	},
	discount_amount: {
		label: "Discount Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	grand_total: {
		label: "Grand Total",
		type: Number,
		decimal: true,
		optional: true
	},
	taxes_and_charges_deducted: {
		label: "Taxes and Charges Deducted",
		type: Number,
		decimal: true,
		optional: true
	},
	apply_discount_on: {
		label: "Apply Discount On",
		type: String,
		optional: true,
		defaultValue: "Grand Total"
	},
	base_grand_total: {
		label: "Base Grand Total",
		type: Number,
		decimal: true,
		optional: true
	},
	plc_conversion_rate: {
		label: "PLC Conversion Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	select_print_heading: {
		label: "Select Print Heading",
		type: String,
		optional: true
	},
	contact_email: {
		label: "Contact Email",
		type: String,
		optional: true
	},
	contact_person: {
		label: "Contact Person",
		type: String,
		optional: true
	},
	in_words: {
		label: "In Words",
		type: String,
		optional: true
	}
});

this.SupplierQuotation.attachSchema(this.Schemas.SupplierQuotation);
