this.Customer = new Mongo.Collection("customer");

this.Customer.userCanInsert = function(userId, doc) {
	return true;
}

this.Customer.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Customer.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Customer = new SimpleSchema({
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
	customer_details: {
		label: "Customer Details",
		type: String,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	lead_name: {
		label: "Lead Name",
		type: String,
		optional: true
	},
	default_currency: {
		label: "Default Currency",
		type: String,
		optional: true
	},
	default_sales_partner: {
		label: "Default Sales Partner",
		type: String,
		optional: true
	},
	customer_type: {
		label: "Customer Type",
		type: String,
		optional: true
	},
	customer_name: {
		label: "Customer Name",
		type: String,
		optional: true
	},
	default_taxes_and_charges: {
		label: "Default Taxes and Charges",
		type: String,
		optional: true
	},
	credit_days: {
		label: "Credit Days",
		type: Number,
		optional: true
	},
	territory: {
		label: "Territory",
		type: String,
		optional: true
	},
	website: {
		label: "Website",
		type: String,
		optional: true
	},
	default_commission_rate: {
		label: "Default Commission Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	credit_days_based_on: {
		label: "Credit Days Based On",
		type: String,
		optional: true
	},
	tax_id: {
		label: "Tax Id",
		type: String,
		optional: true
	},
	credit_limit: {
		label: "Credit Limit",
		type: Number,
		decimal: true,
		optional: true
	},
	customer_group: {
		label: "Customer Group",
		type: String,
		optional: true
	},
	default_price_list: {
		label: "Default Price List",
		type: String,
		optional: true
	},
	is_frozen: {
		label: "Is Frozen",
		type: Number,
		defaultValue: 0
	}
});

this.Customer.attachSchema(this.Schemas.Customer);
