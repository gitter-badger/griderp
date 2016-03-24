this.WebsiteItemGroup = new Mongo.Collection("website_item_group");

this.WebsiteItemGroup.userCanInsert = function(userId, doc) {
	return true;
}

this.WebsiteItemGroup.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.WebsiteItemGroup.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.WebsiteItemGroup = new SimpleSchema({
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
	item_group: {
		label: "Item Group",
		type: String,
		optional: true
	}
});

this.WebsiteItemGroup.attachSchema(this.Schemas.WebsiteItemGroup);
