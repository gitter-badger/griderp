this.ItemWebsiteSpecification = new Mongo.Collection("item_website_specification");

this.ItemWebsiteSpecification.userCanInsert = function(userId, doc) {
	return true;
}

this.ItemWebsiteSpecification.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ItemWebsiteSpecification.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ItemWebsiteSpecification = new SimpleSchema({
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
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	label: {
		label: "Label",
		type: String,
		optional: true
	}
});

this.ItemWebsiteSpecification.attachSchema(this.Schemas.ItemWebsiteSpecification);
