this.Project = new Mongo.Collection("project");

this.Project.userCanInsert = function(userId, doc) {
	return true;
}

this.Project.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Project.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Project = new SimpleSchema({
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
	total_expense_claim: {
		label: "Total Expense Claim",
		type: Number,
		decimal: true,
		optional: true
	},
	per_gross_margin: {
		label: "Per Gross Margin",
		type: Number,
		decimal: true,
		optional: true
	},
	project_type: {
		label: "Project Type",
		type: String,
		optional: true
	},
	cost_center: {
		label: "Cost Center",
		type: String,
		optional: true
	},
	actual_start_date: {
		label: "Actual Start Date",
		type: String,
		optional: true
	},
	actual_end_date: {
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
	total_purchase_cost: {
		label: "Total Purchase Cost",
		type: Number,
		decimal: true,
		optional: true
	},
	status: {
		label: "Status",
		type: String,
		optional: true,
		defaultValue: "Open"
	},
	total_billing_amount: {
		label: "Total Billing Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	project_name: {
		label: "Project Name",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	estimated_costing: {
		label: "Estimated Costing",
		type: Number,
		decimal: true,
		optional: true
	},
	is_active: {
		label: "Is Active",
		type: String,
		optional: true
	},
	gross_margin: {
		label: "Gross Margin",
		type: Number,
		decimal: true,
		optional: true
	},
	percent_complete: {
		label: "Percent Complete",
		type: Number,
		decimal: true,
		optional: true
	},
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	expected_end_date: {
		label: "Expected End Date",
		type: Date,
		optional: true
	},
	sales_order: {
		label: "Sales Order",
		type: String,
		optional: true
	},
	expected_start_date: {
		label: "Expected Start Date",
		type: Date,
		optional: true
	},
	notes: {
		label: "Notes",
		type: String,
		optional: true
	},
	actual_time: {
		label: "Actual Time",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.Project.attachSchema(this.Schemas.Project);
