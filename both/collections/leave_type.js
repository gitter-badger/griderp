this.LeaveType = new Mongo.Collection("leave_type");

this.LeaveType.userCanInsert = function(userId, doc) {
	return true;
}

this.LeaveType.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.LeaveType.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.LeaveType = new SimpleSchema({
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
	is_lwp: {
		label: "Is LWP",
		type: Number,
		defaultValue: 0
	},
	is_carry_forward: {
		label: "Is Carry Forward",
		type: Number,
		defaultValue: 0
	},
	is_encash: {
		label: "Is Encash",
		type: Number,
		defaultValue: 0
	},
	allow_negative: {
		label: "Allow Negative",
		type: Number,
		defaultValue: 0
	},
	leave_type_name: {
		label: "Leave Type Name",
		type: String,
		optional: true
	},
	max_days_allowed: {
		label: "Max Days Allowed",
		type: String,
		optional: true
	},
	include_holiday: {
		label: "Include Holiday",
		type: Number,
		defaultValue: 0
	}
});

this.LeaveType.attachSchema(this.Schemas.LeaveType);
