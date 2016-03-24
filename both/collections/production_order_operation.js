this.ProductionOrderOperation = new Mongo.Collection("production_order_operation");

this.ProductionOrderOperation.userCanInsert = function(userId, doc) {
	return true;
}

this.ProductionOrderOperation.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ProductionOrderOperation.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ProductionOrderOperation = new SimpleSchema({
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
	actual_end_time: {
		label: "Actual End Time",
		type: Date,
		optional: true
	},
	actual_operation_time: {
		label: "Actual Operation Time",
		type: Number,
		decimal: true,
		optional: true
	},
	operation: {
		label: "Operation",
		type: String,
		optional: true
	},
	planned_end_time: {
		label: "Planned End Time",
		type: Date,
		optional: true
	},
	time_in_mins: {
		label: "Time in Minutes",
		type: Number,
		decimal: true,
		optional: true
	},
	status: {
		label: "Status",
		type: String,
		optional: true,
		defaultValue: "Pending"
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
	planned_start_time: {
		label: "Planned Start Time",
		type: Date,
		optional: true
	},
	actual_operating_cost: {
		label: "Actual Operating Cost",
		type: Number,
		decimal: true,
		optional: true
	},
	actual_start_time: {
		label: "Actual Start Time",
		type: Date,
		optional: true
	},
	workstation: {
		label: "Workstation",
		type: String,
		optional: true
	},
	hour_rate: {
		label: "Hour Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	completed_qty: {
		label: "Completed Quantity",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.ProductionOrderOperation.attachSchema(this.Schemas.ProductionOrderOperation);
