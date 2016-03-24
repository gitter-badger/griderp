this.PackingSlipItem = new Mongo.Collection("packing_slip_item");

this.PackingSlipItem.userCanInsert = function(userId, doc) {
	return true;
}

this.PackingSlipItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PackingSlipItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PackingSlipItem = new SimpleSchema({
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
	weight_uom: {
		label: "Weight UOM",
		type: String,
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
	item_name: {
		label: "Item Name",
		type: String,
		optional: true
	},
	net_weight: {
		label: "Net Weight",
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
	stock_uom: {
		label: "Stock UOM",
		type: String,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	batch_no: {
		label: "Batch Number",
		type: String,
		optional: true
	},
	dn_detail: {
		label: "DN Detail",
		type: String,
		optional: true
	}
});

this.PackingSlipItem.attachSchema(this.Schemas.PackingSlipItem);
