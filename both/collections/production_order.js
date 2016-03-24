this.ProductionOrder = new Mongo.Collection("production_order");

this.ProductionOrder.userCanInsert = function(userId, doc) {
	return true;
}

this.ProductionOrder.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ProductionOrder.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ProductionOrder = new SimpleSchema({
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
	use_multi_level_bom: {
		label: "Use Multi Level BOM",
		type: Number,
		defaultValue: 1
	},
	additional_operating_cost: {
		label: "Additional Operating Cost",
		type: Number,
		decimal: true,
		optional: true
	},
	produced_qty: {
		label: "Produced Quantity",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	qty: {
		label: "Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	fg_warehouse: {
		label: "FG Warehouse",
		type: String,
		optional: true
	},
	actual_start_date: {
		label: "Actual Start Date",
		type: Date,
		optional: true
	},
	material_transferred_for_manufacturing: {
		label: "Material Transferred for Manufacturing",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	actual_end_date: {
		label: "Actual End Date",
		type: Date,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	stock_uom: {
		label: "Stock UOM",
		type: String,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true,
		defaultValue: "PRO-"
	},
	status: {
		label: "Status",
		type: String,
		optional: true,
		defaultValue: "Draft"
	},
	project_name: {
		label: "Project Name",
		type: String,
		optional: true
	},
	planned_operating_cost: {
		label: "Planned Operating Cost",
		type: Number,
		decimal: true,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	production_item: {
		label: "Production Item",
		type: String,
		optional: true
	},
	planned_start_date: {
		label: "Planned Start Date",
		type: Date,
		optional: true
	},
	planned_end_date: {
		label: "Planned End Date",
		type: Date,
		optional: true
	},
	actual_operating_cost: {
		label: "Actual Operating Cost",
		type: Number,
		decimal: true,
		optional: true
	},
	expected_delivery_date: {
		label: "Expected Deliery Date",
		type: Date,
		optional: true
	},
	bom_no: {
		label: "BOM Number",
		type: String,
		optional: true
	},
	wip_warehouse: {
		label: "WIP Warehouse",
		type: String,
		optional: true
	},
	sales_order: {
		label: "Sales Order",
		type: String,
		optional: true
	},
	total_operating_cost: {
		label: "Total Operating Cost",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.ProductionOrder.attachSchema(this.Schemas.ProductionOrder);
