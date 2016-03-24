this.PackedItem = new Mongo.Collection("packed_item");

this.PackedItem.userCanInsert = function(userId, doc) {
	return true;
}

this.PackedItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PackedItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PackedItem = new SimpleSchema({
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
	page_break: {
		label: "Page Break",
		type: Number,
		defaultValue: 0
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	serial_no: {
		label: "Serial Number",
		type: String,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	qty: {
		label: "Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	projected_qty: {
		label: "Projected Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	parent_item: {
		label: "Parent Item",
		type: String,
		optional: true
	},
	warehouse: {
		label: "Warehouse",
		type: String,
		optional: true
	},
	batch_no: {
		label: "Batch Number",
		type: String,
		optional: true
	},
	item_name: {
		label: "Item Name",
		type: String,
		optional: true
	},
	parent_detail_docname: {
		label: "Parent Detail Docname",
		type: String,
		optional: true
	},
	actual_qty: {
		label: "Actual Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	uom: {
		label: "UOM",
		type: String,
		optional: true
	},
	prevdoc_doctype: {
		label: "Prevdoc Doctype",
		type: String,
		optional: true
	}
});

this.PackedItem.attachSchema(this.Schemas.PackedItem);
