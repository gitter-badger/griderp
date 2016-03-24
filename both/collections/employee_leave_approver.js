this.EmployeeLeaveApprover = new Mongo.Collection("employee_leave_approver");

this.EmployeeLeaveApprover.userCanInsert = function(userId, doc) {
	return true;
}

this.EmployeeLeaveApprover.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.EmployeeLeaveApprover.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.EmployeeLeaveApprover = new SimpleSchema({
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
	leave_approver: {
		label: "Leave Approver",
		type: String,
		optional: true
	}
});

this.EmployeeLeaveApprover.attachSchema(this.Schemas.EmployeeLeaveApprover);
