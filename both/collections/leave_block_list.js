this.LeaveBlockList = new Mongo.Collection("leave_block_list");

this.LeaveBlockList.userCanInsert = function(userId, doc) {
	return true;
}

this.LeaveBlockList.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.LeaveBlockList.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.LeaveBlockList = new SimpleSchema({
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
	applies_to_all_departments: {
		label: "Applies To All Departments",
		type: Number,
		defaultValue: 0
	},
	leave_block_list_name: {
		label: "Leave Block List Name",
		type: String,
		optional: true
	},
	year: {
		label: "Year",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	}
});

this.LeaveBlockList.attachSchema(this.Schemas.LeaveBlockList);
