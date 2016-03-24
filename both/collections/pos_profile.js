this.PosProfile = new Mongo.Collection("pos_profile");

this.PosProfile.userCanInsert = function(userId, doc) {
	return true;
}

this.PosProfile.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PosProfile.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PosProfile = new SimpleSchema({
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
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	mode_of_payment: {
		label: "Mode Of Payment",
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
	cost_center: {
		label: "Cost Center",
		type: String,
		optional: true
	},
	income_account: {
		label: "Income Account",
		type: String,
		optional: true
	},
	update_stock: {
		label: "Update Stock",
		type: Number,
		defaultValue: 1
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
	warehouse: {
		label: "Warehouse",
		type: String,
		optional: true
	},
	territory: {
		label: "Territory",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	taxes_and_charges: {
		label: "Taxes and Charges",
		type: String,
		optional: true
	},
	write_off_cost_center: {
		label: "Write Off Cost Center",
		type: String,
		optional: true
	},
	write_off_account: {
		label: "Write Off Account",
		type: String,
		optional: true
	},
	user: {
		label: "User",
		type: String,
		optional: true
	},
	expense_account: {
		label: "Expense Account",
		type: String,
		optional: true
	},
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	print_format: {
		label: "Print Format",
		type: String,
		optional: true
	},
	select_print_heading: {
		label: "Select Print Heading",
		type: String,
		optional: true
	}
});

this.PosProfile.attachSchema(this.Schemas.PosProfile);
