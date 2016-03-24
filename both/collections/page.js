this.Page = new Mongo.Collection("page");

this.Page.userCanInsert = function(userId, doc) {
	return true;
}

this.Page.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Page.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Page = new SimpleSchema({
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
	title: {
		label: "Title",
		type: String,
		optional: true
	},
	module: {
		label: "Module",
		type: String,
		optional: true
	},
	standard: {
		label: "Standard",
		type: String,
		optional: true
	},
	page_name: {
		label: "Page name",
		type: String,
		optional: true
	},
	icon: {
		label: "Icon",
		type: String,
		optional: true
	}
});

this.Page.attachSchema(this.Schemas.Page);
