this.IndustryType = new Mongo.Collection("industry_type");

this.IndustryType.userCanInsert = function(userId, doc) {
	return true;
}

this.IndustryType.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.IndustryType.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.IndustryType = new SimpleSchema({
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
	industry: {
		label: "Industry",
		type: String,
		optional: true
	}
});

this.IndustryType.attachSchema(this.Schemas.IndustryType);
