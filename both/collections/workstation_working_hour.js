this.WorkstationWorkingHour = new Mongo.Collection("workstation_working_hour");

this.WorkstationWorkingHour.userCanInsert = function(userId, doc) {
	return true;
}

this.WorkstationWorkingHour.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.WorkstationWorkingHour.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.WorkstationWorkingHour = new SimpleSchema({
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
	start_time: {
		label: "Start Time",
		type: String,
		optional: true
	},
	enabled: {
		label: "Enabled",
		type: Number,
		defaultValue: 1
	},
	end_time: {
		label: "End Time",
		type: String,
		optional: true
	}
});

this.WorkstationWorkingHour.attachSchema(this.Schemas.WorkstationWorkingHour);
