this.LeaveBlockListDate = new Mongo.Collection("leave_block_list_date");

this.LeaveBlockListDate.userCanInsert = function(userId, doc) {
	return true;
}

this.LeaveBlockListDate.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.LeaveBlockListDate.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.LeaveBlockListDate = new SimpleSchema({
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
	block_date: {
		label: "Block Date",
		type: Date,
		optional: true
	},
	reason: {
		label: "Reason",
		type: String,
		optional: true
	}
});

this.LeaveBlockListDate.attachSchema(this.Schemas.LeaveBlockListDate);
