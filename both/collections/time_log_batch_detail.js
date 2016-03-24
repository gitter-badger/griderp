this.TimeLogBatchDetail = new Mongo.Collection("time_log_batch_detail");

this.TimeLogBatchDetail.userCanInsert = function(userId, doc) {
	return true;
}

this.TimeLogBatchDetail.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.TimeLogBatchDetail.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.TimeLogBatchDetail = new SimpleSchema({
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
	hours: {
		label: "Hours",
		type: Number,
		decimal: true,
		optional: true
	},
	time_log: {
		label: "Time Log",
		type: String,
		optional: true
	},
	billing_amount: {
		label: "Billing Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	activity_type: {
		label: "Activity Type",
		type: String,
		optional: true
	}
});

this.TimeLogBatchDetail.attachSchema(this.Schemas.TimeLogBatchDetail);
