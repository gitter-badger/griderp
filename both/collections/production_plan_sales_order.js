this.ProductionPlanSalesOrder = new Mongo.Collection("production_plan_sales_order");

this.ProductionPlanSalesOrder.userCanInsert = function(userId, doc) {
	return true;
}

this.ProductionPlanSalesOrder.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ProductionPlanSalesOrder.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ProductionPlanSalesOrder = new SimpleSchema({
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
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	grand_total: {
		label: "Grand Total",
		type: Number,
		decimal: true,
		optional: true
	},
	sales_order_date: {
		label: "Sales Order Date",
		type: Date,
		optional: true
	},
	sales_order: {
		label: "Sales Order",
		type: String,
		optional: true
	}
});

this.ProductionPlanSalesOrder.attachSchema(this.Schemas.ProductionPlanSalesOrder);
