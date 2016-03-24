this.SchedulerLog = new Mongo.Collection("scheduler_log");

this.SchedulerLog.userCanInsert = function(userId, doc) {
	return true;
}

this.SchedulerLog.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SchedulerLog.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SchedulerLog = new SimpleSchema({
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
	seen: {
		label: "Seen",
		type: Number,
		defaultValue: 0
	},
	method: {
		label: "Method",
		type: String,
		optional: true
	},
	error: {
		label: "Error",
		type: String,
		optional: true
	}
});

this.SchedulerLog.attachSchema(this.Schemas.SchedulerLog);
