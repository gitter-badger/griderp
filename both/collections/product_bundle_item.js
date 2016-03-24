this.ProductBundleItem = new Mongo.Collection("product_bundle_item");

this.ProductBundleItem.userCanInsert = function(userId, doc) {
	return true;
}

this.ProductBundleItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ProductBundleItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ProductBundleItem = new SimpleSchema({
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
	rate: {
		label: "Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	uom: {
		label: "UOM",
		type: String,
		optional: true
	},
	qty: {
		label: "Quantity",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.ProductBundleItem.attachSchema(this.Schemas.ProductBundleItem);
