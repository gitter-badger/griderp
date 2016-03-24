this.TimeLog = new Mongo.Collection("time_log");

this.TimeLog.userCanInsert = function(userId, doc) {
	return true;
}

this.TimeLog.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.TimeLog.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.TimeLog = new SimpleSchema({
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
	to_time: {
		label: "To Time",
		type: Date,
		optional: true
	},
	billing_amount: {
		label: "Billing Amount",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	sales_invoice: {
		label: "Sales Invoice",
		type: String,
		optional: true
	},
	operation: {
		label: "Operation",
		type: String,
		optional: true
	},
	costing_amount: {
		label: "Costing Amount",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	title: {
		label: "Title",
		type: String,
		optional: true
	},
	note: {
		label: "Note",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	billable: {
		label: "Billable",
		type: Number,
		defaultValue: 0
	},
	employee: {
		label: "Employee",
		type: String,
		optional: true
	},
	status: {
		label: "Status",
		type: String,
		optional: true
	},
	hours: {
		label: "Hours",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	user: {
		label: "User",
		type: String,
		optional: true
	},
	costing_rate: {
		label: "Costing Rate",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	time_log_batch: {
		label: "Time Log Batch",
		type: String,
		optional: true
	},
	from_time: {
		label: "From Time",
		type: Date,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	workstation: {
		label: "Workstation",
		type: String,
		optional: true
	},
	task: {
		label: "Task",
		type: String,
		optional: true
	},
	billing_rate: {
		label: "Billing Rate",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	project: {
		label: "Project",
		type: String,
		optional: true
	},
	completed_qty: {
		label: "Completed Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	for_manufacturing: {
		label: "For Manufacturing",
		type: Number,
		defaultValue: 0
	},
	operation_id: {
		label: "Operation Id",
		type: String,
		optional: true
	},
	production_order: {
		label: "Production Order",
		type: String,
		optional: true
	},
	activity_type: {
		label: "Activity Type",
		type: String,
		optional: true
	}
});

this.TimeLog.attachSchema(this.Schemas.TimeLog);
