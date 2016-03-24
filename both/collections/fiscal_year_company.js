this.FiscalYearCompany = new Mongo.Collection("fiscal_year_company");

this.FiscalYearCompany.userCanInsert = function(userId, doc) {
	return true;
}

this.FiscalYearCompany.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.FiscalYearCompany.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.FiscalYearCompany = new SimpleSchema({
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
	company: {
		label: "Company",
		type: String,
		optional: true
	}
});

this.FiscalYearCompany.attachSchema(this.Schemas.FiscalYearCompany);
