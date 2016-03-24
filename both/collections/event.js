this.Event = new Mongo.Collection("event");

this.Event.userCanInsert = function(userId, doc) {
	return true;
}

this.Event.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Event.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Event = new SimpleSchema({
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
	event_type: {
		label: "Event Type",
		type: String,
		optional: true
	},
	tuesday: {
		label: "Tuesday",
		type: Number,
		defaultValue: 0
	},
	all_day: {
		label: "All Day",
		type: Number,
		defaultValue: 0
	},
	repeat_till: {
		label: "Repeat Until",
		type: Date,
		optional: true
	},
	saturday: {
		label: "Saturday",
		type: Number,
		defaultValue: 0
	},
	subject: {
		label: "Subject",
		type: String,
		optional: true
	},
	repeat_this_event: {
		label: "Repeat This Event",
		type: Number,
		defaultValue: 0
	},
	thursday: {
		label: "Thursday",
		type: Number,
		defaultValue: 0
	},
	sunday: {
		label: "Sunday",
		type: Number,
		defaultValue: 0
	},
	send_reminder: {
		label: "Send Reminder",
		type: Number,
		defaultValue: 1
	},
	ref_type: {
		label: "Reference Type",
		type: String,
		optional: true
	},
	ref_name: {
		label: "Reference Name",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	monday: {
		label: "Monday",
		type: Number,
		defaultValue: 0
	},
	friday: {
		label: "Friday",
		type: Number,
		defaultValue: 0
	},
	wednesday: {
		label: "Wednesday",
		type: Number,
		defaultValue: 0
	},
	starts_on: {
		label: "Starts On",
		type: String,
		optional: true
	},
	ends_on: {
		label: "Ends On",
		type: String,
		optional: true
	},
	repeat_on: {
		label: "Repeat On",
		type: String,
		optional: true
	}
});

this.Event.attachSchema(this.Schemas.Event);
