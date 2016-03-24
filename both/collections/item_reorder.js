this.ItemReorder = new Mongo.Collection("item_reorder");

this.ItemReorder.userCanInsert = function(userId, doc) {
	return true;
}

this.ItemReorder.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ItemReorder.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ItemReorder = new SimpleSchema({
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
	warehouse: {
		label: "Warehouse",
		type: String,
		optional: true
	},
	warehouse_reorder_qty: {
		label: "Warehouse Reorder Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	material_request_type: {
		label: "Material Request Type",
		type: String,
		optional: true
	},
	warehouse_reorder_level: {
		label: "Warehouse Reorder Level",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.ItemReorder.attachSchema(this.Schemas.ItemReorder);
