this.SalesInvoice = new Mongo.Collection("sales_invoice");

this.SalesInvoice.userCanInsert = function(userId, doc) {
	return true;
}

this.SalesInvoice.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalesInvoice.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalesInvoice = new SimpleSchema({
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
	cash_bank_account: {
		label: "Cash Bank Account",
		type: String,
		optional: true
	},
	apply_discount_on: {
		label: "Apply Discount On",
		type: String,
		optional: true,
		defaultValue: "Grand Total"
	},
	selling_price_list: {
		label: "Selling Price List",
		type: String,
		optional: true
	},
	return_against: {
		label: "Return Against",
		type: String,
		optional: true
	},
	tc_name: {
		label: "TC Name",
		type: String,
		optional: true
	},
	source: {
		label: "Source",
		type: String,
		optional: true
	},
	base_grand_total: {
		label: "Base Grand Total",
		type: Number,
		decimal: true,
		optional: true
	},
	base_in_words: {
		label: "Base In Words",
		type: String,
		optional: true
	},
	due_date: {
		label: "Due Date",
		type: Date,
		optional: true
	},
	ignore_pricing_rule: {
		label: "Ignore Pricing Rule",
		type: Number,
		defaultValue: 0
	},
	write_off_cost_center: {
		label: "Write Off Cost Center",
		type: String,
		optional: true
	},
	base_discount_amount: {
		label: "Base Discount Amount",
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
	shipping_address_name: {
		label: "Shipping Address Name",
		type: String,
		optional: true
	},
	discount_amount: {
		label: "Discount Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	is_return: {
		label: "Is Return",
		type: Number,
		defaultValue: 0
	},
	write_off_outstanding_amount_automatically: {
		label: "Write Off Outstanding Amount Automatically",
		type: Number,
		defaultValue: 0
	},
	select_print_heading: {
		label: "Select Print Heading",
		type: String,
		optional: true
	},
	is_pos: {
		label: "Is POS",
		type: Number,
		defaultValue: 0
	},
	against_income_account: {
		label: "Against Income Account",
		type: String,
		optional: true
	},
	write_off_amount: {
		label: "Write Off Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	mode_of_payment: {
		label: "Mode of Payment",
		type: String,
		optional: true
	},
	price_list_currency: {
		label: "Price List Currency",
		type: String,
		optional: true
	},
	contact_display: {
		label: "Contact Display",
		type: String,
		optional: true
	},
	write_off_account: {
		label: "Write Off Account",
		type: String,
		optional: true
	},
	next_date: {
		label: "Next Date",
		type: Date,
		optional: true
	},
	terms: {
		label: "Terms",
		type: String,
		optional: true
	},
	is_opening: {
		label: "Is Opening",
		type: String,
		optional: true,
		defaultValue: "No"
	},
	customer_address: {
		label: "Customer Address",
		type: String,
		optional: true
	},
	total_commission: {
		label: "Total Commission",
		type: Number,
		decimal: true,
		optional: true
	},
	contact_mobile: {
		label: "Contact Mobile",
		type: String,
		optional: true
	},
	c_form_applicable: {
		label: "C Form Applicable",
		type: String,
		optional: true
	},
	base_net_total: {
		label: "Base Net Total",
		type: Number,
		decimal: true,
		optional: true
	},
	rounded_total: {
		label: "Rounded Total",
		type: Number,
		decimal: true,
		optional: true
	},
	customer_group: {
		label: "Customer Group",
		type: String,
		optional: true
	},
	commission_rate: {
		label: "Commission Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	repeat_on_day_of_month: {
		label: "Repeat on Day of Month",
		type: Number,
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
	},
	recurring_print_format: {
		label: "Recurring Print Format",
		type: String,
		optional: true
	},
	campaign: {
		label: "Campaign",
		type: String,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	conversion_rate: {
		label: "Conversion Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	to_date: {
		label: "To Date",
		type: Date,
		optional: true
	},
	total_advance: {
		label: "Total Advance",
		type: Number,
		decimal: true,
		optional: true
	},
	posting_time: {
		label: "Posting Time",
		type: String,
		optional: true
	},
	total: {
		label: "Total",
		type: Number,
		decimal: true,
		optional: true
	},
	customer_name: {
		label: "Customer Name",
		type: String,
		optional: true
	},
	update_stock: {
		label: "Update Stock",
		type: Number,
		defaultValue: 0
	},
	base_total: {
		label: "Base Total",
		type: Number,
		decimal: true,
		optional: true
	},
	from_date: {
		label: "From Date",
		type: Date,
		optional: true
	},
	territory: {
		label: "Territory",
		type: String,
		optional: true
	},
	sales_partner: {
		label: "Sales Partner",
		type: String,
		optional: true
	},
	project_name: {
		label: "Project Name",
		type: String,
		optional: true
	},
	end_date: {
		label: "End Date",
		type: Date,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	contact_email: {
		label: "Contact Email",
		type: String,
		optional: true
	},
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	grand_total: {
		label: "Grand Total",
		type: Number,
		decimal: true,
		optional: true
	},
	notification_email_address: {
		label: "Notification Email Address",
		type: String,
		optional: true
	},
	is_recurring: {
		label: "Is Recurring",
		type: Number,
		defaultValue: 0
	},
	shipping_address: {
		label: "Shipping Address",
		type: String,
		optional: true
	},
	posting_date: {
		label: "Posting Date",
		type: Date,
		optional: true
	},
	debit_to: {
		label: "Debit To",
		type: String,
		optional: true
	},
	address_display: {
		label: "Address Display",
		type: String,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	currency: {
		label: "Currency",
		type: String,
		optional: true
	},
	letter_head: {
		label: "Letter Head",
		type: String,
		optional: true
	},
	recurring_id: {
		label: "Recurring Id",
		type: String,
		optional: true
	},
	shipping_rule: {
		label: "Shipping Rule",
		type: String,
		optional: true
	},
	paid_amount: {
		label: "Paid Amount",
		type: Number,
		decimal: true,
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
	recurring_type: {
		label: "Recurring Type",
		type: String,
		optional: true
	},
	taxes_and_charges: {
		label: "Taxes and Charges",
		type: String,
		optional: true
	},
	outstanding_amount: {
		label: "Outstanding Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	remarks: {
		label: "Remarks",
		type: String,
		optional: true
	},
	c_form_no: {
		label: "C Form Number",
		type: String,
		optional: true
	},
	plc_conversion_rate: {
		label: "PLC Conversion Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	net_total: {
		label: "Net Total",
		type: Number,
		decimal: true,
		optional: true
	},
	base_rounded_total: {
		label: "Base Rounded Total",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.SalesInvoice.attachSchema(this.Schemas.SalesInvoice);
