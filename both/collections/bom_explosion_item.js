this.BomExplosionItem = new Mongo.Collection("bom_explosion_item");

this.BomExplosionItem.userCanInsert = function(userId, doc) {
	return true;
}

this.BomExplosionItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.BomExplosionItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.BomExplosionItem = new SimpleSchema({
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
	qty_consumed_per_unit: {
		label: "Quantity Consumed Per Unit",
		type: Number,
		decimal: true,
		optional: true
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
	qty: {
		label: "Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	amount: {
		label: "Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	stock_uom: {
		label: "Stock UOM",
		type: String,
		optional: true
	},
	image: {
		label: "Image",
		type: String,
		optional: true
	}
});

this.BomExplosionItem.attachSchema(this.Schemas.BomExplosionItem);
