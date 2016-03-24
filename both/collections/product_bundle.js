this.ProductBundle = new Mongo.Collection("product_bundle");

this.ProductBundle.userCanInsert = function(userId, doc) {
	return true;
}

this.ProductBundle.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ProductBundle.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ProductBundle = new SimpleSchema({
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
	new_item_code: {
		label: "New Item Code",
		type: String,
		optional: true
	}
});

this.ProductBundle.attachSchema(this.Schemas.ProductBundle);
