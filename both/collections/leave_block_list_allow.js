this.LeaveBlockListAllow = new Mongo.Collection("leave_block_list_allow");

this.LeaveBlockListAllow.userCanInsert = function(userId, doc) {
	return true;
}

this.LeaveBlockListAllow.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.LeaveBlockListAllow.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.LeaveBlockListAllow = new SimpleSchema({
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
	allow_user: {
		label: "Allow User",
		type: String,
		optional: true
	}
});

this.LeaveBlockListAllow.attachSchema(this.Schemas.LeaveBlockListAllow);
