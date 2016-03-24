this.ProductionPlanItem = new Mongo.Collection("production_plan_item");

this.ProductionPlanItem.userCanInsert = function(userId, doc) {
	return true;
}

this.ProductionPlanItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ProductionPlanItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ProductionPlanItem = new SimpleSchema({
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
	bom_no: {
		label: "BOM Number",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	sales_order: {
		label: "Sales Order",
		type: String,
		optional: true
	},
	planned_qty: {
		label: "Planned Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	planned_start_date: {
		label: "Planned Start Date",
		type: Date,
		optional: true
	},
	stock_uom: {
		label: "Stock UOM",
		type: String,
		optional: true
	},
	warehouse: {
		label: "Warehouse",
		type: String,
		optional: true
	},
	so_pending_qty: {
		label: "SO Pending Quantity",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.ProductionPlanItem.attachSchema(this.Schemas.ProductionPlanItem);
