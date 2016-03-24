this.SalesOrder = new Mongo.Collection("sales_order");

this.SalesOrder.userCanInsert = function(userId, doc) {
	return true;
}

this.SalesOrder.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalesOrder.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalesOrder = new SimpleSchema({
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
	billing_status: {
		label: "Billing Status",
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
		label: "Base in Words",
		type: String,
		optional: true
	},
	ignore_pricing_rule: {
		label: "Ignore Pricing Rule",
		type: Number,
		defaultValue: 0
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
	discount_amount: {
		label: "Discount Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	select_print_heading: {
		label: "Select Print Heading",
		type: String,
		optional: true
	},
	delivery_date: {
		label: "Delivery Date",
		type: Date,
		optional: true
	},
	net_total: {
		label: "Net Total",
		type: Number,
		decimal: true,
		optional: true
	},
	po_date: {
		label: "PO Date",
		type: Date,
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
	advance_paid: {
		label: "Advance Paid",
		type: Number,
		decimal: true,
		optional: true
	},
	shipping_address: {
		label: "Shipping Address",
		type: String,
		optional: true
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
	delivery_status: {
		label: "Delivery Status",
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
	shipping_address_name: {
		label: "Shipping Address Name",
		type: String,
		optional: true
	},
	po_no: {
		label: "PO Number",
		type: String,
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
	commission_rate: {
		label: "Commission Rate",
		type: Number,
		decimal: true,
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
	customer_group: {
		label: "Customer Group",
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
	order_type: {
		label: "Order Type",
		type: String,
		optional: true,
		defaultValue: "Sales"
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	recurring_type: {
		label: "Recurring Type",
		type: String,
		optional: true
	},
	per_delivered: {
		label: "Per Delivered",
		type: Number,
		decimal: true,
		optional: true
	},
	status: {
		label: "Status",
		type: String,
		optional: true,
		defaultValue: "Draft"
	},
	taxes_and_charges: {
		label: "Taxes and Charges",
		type: String,
		optional: true
	},
	per_billed: {
		label: "Per Billed",
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
	total_taxes_and_charges: {
		label: "Total Taxes and Charges",
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

this.SalesOrder.attachSchema(this.Schemas.SalesOrder);
