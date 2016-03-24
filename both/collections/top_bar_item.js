this.TopBarItem = new Mongo.Collection("top_bar_item");

this.TopBarItem.userCanInsert = function(userId, doc) {
	return true;
}

this.TopBarItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.TopBarItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.TopBarItem = new SimpleSchema({
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
	url: {
		label: "URL",
		type: String,
		optional: true
	},
	parent_label: {
		label: "Parent Label",
		type: String,
		optional: true
	},
	right: {
		label: "Right",
		type: Number,
		defaultValue: 0
	},
	target: {
		label: "Target",
		type: String,
		optional: true
	},
	label: {
		label: "Label",
		type: String,
		optional: true
	}
});

this.TopBarItem.attachSchema(this.Schemas.TopBarItem);
