this.CompanyHistory = new Mongo.Collection("company_history");

this.CompanyHistory.userCanInsert = function(userId, doc) {
	return true;
}

this.CompanyHistory.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.CompanyHistory.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.CompanyHistory = new SimpleSchema({
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
	highlight: {
		label: "Highlight",
		type: String,
		optional: true
	},
	year: {
		label: "Year",
		type: String,
		optional: true
	}
});

this.CompanyHistory.attachSchema(this.Schemas.CompanyHistory);
