this.TermsAndConditions = new Mongo.Collection("terms_and_conditions");

this.TermsAndConditions.userCanInsert = function(userId, doc) {
	return true;
}

this.TermsAndConditions.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.TermsAndConditions.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.TermsAndConditions = new SimpleSchema({
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
	terms: {
		label: "Terms",
		type: String,
		optional: true
	},
	title: {
		label: "Title",
		type: String,
		optional: true
	}
});

this.TermsAndConditions.attachSchema(this.Schemas.TermsAndConditions);
