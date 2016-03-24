this.ItemVariantAttribute = new Mongo.Collection("item_variant_attribute");

this.ItemVariantAttribute.userCanInsert = function(userId, doc) {
	return true;
}

this.ItemVariantAttribute.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ItemVariantAttribute.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ItemVariantAttribute = new SimpleSchema({
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
	from_range: {
		label: "From Range",
		type: Number,
		decimal: true,
		optional: true
	},
	numeric_values: {
		label: "Numeric Values",
		type: Number,
		defaultValue: 0
	},
	attribute: {
		label: "Attribute",
		type: String,
		optional: true
	},
	to_range: {
		label: "To Range",
		type: Number,
		decimal: true,
		optional: true
	},
	increment: {
		label: "Increment",
		type: Number,
		decimal: true,
		optional: true
	},
	attribute_value: {
		label: "Attribute Value",
		type: String,
		optional: true
	}
});

this.ItemVariantAttribute.attachSchema(this.Schemas.ItemVariantAttribute);
