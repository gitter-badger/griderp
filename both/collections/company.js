this.Company = new Mongo.Collection("company");

this.Company.userCanInsert = function(userId, doc) {
	return true;
}

this.Company.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Company.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Company = new SimpleSchema({
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
	website: {
		label: "Website",
		type: String,
		optional: true
	},
	domain: {
		label: "Domain",
		type: String,
		optional: true
	},
	default_letter_head: {
		label: "Default Letter Head",
		type: String,
		optional: true
	},
	default_income_account: {
		label: "Default Income Account",
		type: String,
		optional: true
	},
	company_name: {
		label: "Company Name",
		type: String,
		optional: true
	},
	default_terms: {
		label: "Default Terms",
		type: String,
		optional: true
	},
	default_receivable_account: {
		label: "Default Receivable Account",
		type: String,
		optional: true
	},
	cost_center: {
		label: "Cost Center",
		type: String,
		optional: true
	},
	registration_details: {
		label: "Registration Details",
		type: String,
		optional: true
	},
	round_off_account: {
		label: "Round Off Account",
		type: String,
		optional: true
	},
	yearly_bgt_flag: {
		label: "Yearly Budget Flag",
		type: String,
		optional: true
	},
	default_expense_account: {
		label: "Default Expense Account",
		type: String,
		optional: true
	},
	credit_days: {
		label: "Credit Days",
		type: Number,
		optional: true
	},
	expenses_included_in_valuation: {
		label: "Expenses Included in Valuation",
		type: String,
		optional: true
	},
	default_bank_account: {
		label: "Default Bank Account",
		type: String,
		optional: true
	},
	default_currency: {
		label: "Default Currency",
		type: String,
		optional: true
	},
	email: {
		label: "Email",
		type: String,
		optional: true
	},
	fax: {
		label: "Fax",
		type: String,
		optional: true
	},
	default_holiday_list: {
		label: "Default Holiday List",
		type: String,
		optional: true
	},
	credit_days_based_on: {
		label: "Credit Days Based On",
		type: String,
		optional: true
	},
	default_payable_account: {
		label: "Default Payable Account",
		type: String,
		optional: true
	},
	stock_adjustment_account: {
		label: "Stock Adjustment Account",
		type: String,
		optional: true
	},
	abbr: {
		label: "Abbreviation",
		type: String,
		optional: true
	},
	monthly_bgt_flag: {
		label: "Monthly Budget Flag",
		type: String,
		optional: true
	},
	address: {
		label: "Address",
		type: String,
		optional: true
	},
	credit_limit: {
		label: "Credit Limit",
		type: Number,
		decimal: true,
		optional: true
	},
	stock_received_but_not_billed: {
		label: "Stock Received But Not Billed",
		type: String,
		optional: true
	},
	country: {
		label: "Country",
		type: String,
		optional: true
	},
	chart_of_accounts: {
		label: "Chart of Accounts",
		type: String,
		optional: true
	},
	phone_no: {
		label: "Phone Number",
		type: String,
		optional: true
	},
	default_cash_account: {
		label: "Default Cash Account",
		type: String,
		optional: true
	},
	round_off_cost_center: {
		label: "Round Off Cost Center",
		type: String,
		optional: true
	}
});

this.Company.attachSchema(this.Schemas.Company);
