this.CForm = new Mongo.Collection("c_form");

this.CForm.userCanInsert = function(userId, doc) {
	return true;
}

this.CForm.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.CForm.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.CForm = new SimpleSchema({
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
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	c_form_no: {
		label: "C Form Number",
		type: String,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	state: {
		label: "State",
		type: String,
		optional: true
	},
	received_date: {
		label: "Received Date",
		type: Date,
		optional: true
	},
	total_invoiced_amount: {
		label: "Total Invoiced Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	quarter: {
		label: "Quarter",
		type: String,
		optional: true
	}
});

this.CForm.attachSchema(this.Schemas.CForm);
