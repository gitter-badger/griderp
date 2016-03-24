this.LeaveApplication = new Mongo.Collection("leave_application");

this.LeaveApplication.userCanInsert = function(userId, doc) {
	return true;
}

this.LeaveApplication.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.LeaveApplication.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.LeaveApplication = new SimpleSchema({
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
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	letter_head: {
		label: "Letter Head",
		type: String,
		optional: true
	},
	to_date: {
		label: "To Date",
		type: Date,
		optional: true
	},
	half_day: {
		label: "Half Day",
		type: Number,
		defaultValue: 0
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	leave_balance: {
		label: "Leave Balance",
		type: Number,
		decimal: true,
		optional: true
	},
	from_date: {
		label: "From Date",
		type: Date,
		optional: true
	},
	employee: {
		label: "Employee",
		type: String,
		optional: true
	},
	status: {
		label: "Status",
		type: String,
		optional: true,
		defaultValue: "Open"
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
	leave_approver: {
		label: "Leave Approver",
		type: String,
		optional: true
	},
	total_leave_days: {
		label: "Total Leave Days",
		type: Number,
		decimal: true,
		optional: true
	},
	employee_name: {
		label: "Employee Name",
		type: String,
		optional: true
	},
	follow_via_email: {
		label: "Follow Via Email",
		type: Number,
		defaultValue: 1
	},
	leave_approver_name: {
		label: "Leave Approver Name",
		type: String,
		optional: true
	},
	leave_type: {
		label: "Leave Type",
		type: String,
		optional: true
	},
	posting_date: {
		label: "Posting Date",
		type: Date,
		optional: true
	}
});

this.LeaveApplication.attachSchema(this.Schemas.LeaveApplication);
