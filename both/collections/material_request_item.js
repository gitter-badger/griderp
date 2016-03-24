this.MaterialRequestItem = new Mongo.Collection("material_request_item");

this.MaterialRequestItem.userCanInsert = function(userId, doc) {
	return true;
}

this.MaterialRequestItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.MaterialRequestItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.MaterialRequestItem = new SimpleSchema({
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
	schedule_date: {
		label: "Schedule Date",
		type: Date,
		optional: true
	},
	lead_time_date: {
		label: "Lead Time Date",
		type: Date,
		optional: true
	},
	page_break: {
		label: "Page Break",
		type: Number,
		defaultValue: 0
	},
	item_name: {
		label: "Item name",
		type: String,
		optional: true
	},
	ordered_qty: {
		label: "Ordered Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	warehouse: {
		label: "Warehouse",
		type: String,
		optional: true
	},
	image: {
		label: "Image",
		type: String,
		optional: true
	},
	uom: {
		label: "UOM",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	brand: {
		label: "Brand",
		type: String,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	projected_qty: {
		label: "Projected Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	qty: {
		label: "Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	item_group: {
		label: "Item Group",
		type: String,
		optional: true
	},
	min_order_qty: {
		label: "Minimum Order Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	sales_order_no: {
		label: "Sales Order Number",
		type: String,
		optional: true
	}
});

this.MaterialRequestItem.attachSchema(this.Schemas.MaterialRequestItem);
