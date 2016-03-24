this.Task = new Mongo.Collection("task");

this.Task.userCanInsert = function(userId, doc) {
	return true;
}

this.Task.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Task.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Task = new SimpleSchema({
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
	exp_end_date: {
		label: "Expected End Date",
		type: Date,
		optional: true
	},
	review_date: {
		label: "Review Date",
		type: Date,
		optional: true
	},
	total_expense_claim: {
		label: "Total Expense Claim",
		type: Number,
		decimal: true,
		optional: true
	},
	subject: {
		label: "Subject",
		type: String,
		optional: true
	},
	act_end_date: {
		label: "Actual End Date",
		type: Date,
		optional: true
	},
	total_costing_amount: {
		label: "Total Costing Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	priority: {
		label: "Priority",
		type: String,
		optional: true
	},
	expected_time: {
		label: "Expected Time",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	status: {
		label: "Status",
		type: String,
		optional: true
	},
	total_billing_amount: {
		label: "Total Billing Amount",
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
	act_start_date: {
		label: "Actual Start Date",
		type: Date,
		optional: true
	},
	closing_date: {
		label: "Closing Date",
		type: Date,
		optional: true
	},
	project: {
		label: "Project",
		type: String,
		optional: true
	},
	exp_start_date: {
		label: "Expected Start Date",
		type: Date,
		optional: true
	},
	actual_time: {
		label: "Actual Time",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.Task.attachSchema(this.Schemas.Task);
