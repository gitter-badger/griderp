this.FiscalYear = new Mongo.Collection("fiscal_year");

this.FiscalYear.userCanInsert = function(userId, doc) {
	return true;
}

this.FiscalYear.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.FiscalYear.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.FiscalYear = new SimpleSchema({
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
	disabled: {
		label: "Disabled",
		type: Number,
		defaultValue: 0
	},
	year_end_date: {
		label: "Year End Date",
		type: Date,
		optional: true
	},
	year_start_date: {
		label: "Year Start Date",
		type: Date,
		optional: true
	},
	year: {
		label: "Year",
		type: String,
		optional: true
	}
});

this.FiscalYear.attachSchema(this.Schemas.FiscalYear);
