this.ItemAttribute = new Mongo.Collection("item_attribute");

this.ItemAttribute.userCanInsert = function(userId, doc) {
	return true;
}

this.ItemAttribute.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ItemAttribute.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ItemAttribute = new SimpleSchema({
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
	numeric_values: {
		label: "Numeric Values",
		type: Number,
		defaultValue: 0
	},
	to_range: {
		label: "To Range",
		type: Number,
		decimal: true,
		optional: true
	},
	attribute_name: {
		label: "Attribute Name",
		type: String,
		optional: true
	},
	increment: {
		label: "Increment",
		type: Number,
		decimal: true,
		optional: true
	},
	from_range: {
		label: "From Range",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.ItemAttribute.attachSchema(this.Schemas.ItemAttribute);
