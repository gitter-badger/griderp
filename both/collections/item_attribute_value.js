this.ItemAttributeValue = new Mongo.Collection("item_attribute_value");

this.ItemAttributeValue.userCanInsert = function(userId, doc) {
	return true;
}

this.ItemAttributeValue.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ItemAttributeValue.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ItemAttributeValue = new SimpleSchema({
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
	attribute_value: {
		label: "Attribute Value",
		type: String,
		optional: true
	},
	abbr: {
		label: "Abbreviation",
		type: String,
		optional: true
	}
});

this.ItemAttributeValue.attachSchema(this.Schemas.ItemAttributeValue);
