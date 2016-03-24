this.TimeLogBatch = new Mongo.Collection("time_log_batch");

this.TimeLogBatch.userCanInsert = function(userId, doc) {
	return true;
}

this.TimeLogBatch.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.TimeLogBatch.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.TimeLogBatch = new SimpleSchema({
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
	status: {
		label: "Status",
		type: String,
		optional: true,
		defaultValue: "Draft"
	},
	total_billing_amount: {
		label: "Total Billing Amount",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	sales_invoice: {
		label: "Sales Invoice",
		type: String,
		optional: true
	},
	total_hours: {
		label: "Total Hours",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	}
});

this.TimeLogBatch.attachSchema(this.Schemas.TimeLogBatch);
