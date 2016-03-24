this.LeaveAllocation = new Mongo.Collection("leave_allocation");

this.LeaveAllocation.userCanInsert = function(userId, doc) {
	return true;
}

this.LeaveAllocation.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.LeaveAllocation.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.LeaveAllocation = new SimpleSchema({
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
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	new_leaves_allocated: {
		label: "New Leaves Allocated",
		type: Number,
		decimal: true,
		optional: true
	},
	carry_forwarded_leaves: {
		label: "Carry Forwarded Leaves",
		type: Number,
		decimal: true,
		optional: true
	},
	carry_forward: {
		label: "Carry Forward",
		type: Number,
		defaultValue: 0
	},
	employee_name: {
		label: "Employee Name",
		type: String,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
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
	},
	employee: {
		label: "Employee",
		type: String,
		optional: true
	},
	total_leaves_allocated: {
		label: "Total Leaves Allocated",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.LeaveAllocation.attachSchema(this.Schemas.LeaveAllocation);
