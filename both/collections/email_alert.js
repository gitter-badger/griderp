this.EmailAlert = new Mongo.Collection("email_alert");

this.EmailAlert.userCanInsert = function(userId, doc) {
	return true;
}

this.EmailAlert.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.EmailAlert.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.EmailAlert = new SimpleSchema({
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
	attach_print: {
		label: "Attach Print",
		type: Number,
		defaultValue: 0
	},
	enabled: {
		label: "Enabled",
		type: Number,
		defaultValue: 1
	},
	days_in_advance: {
		label: "Days In Advance",
		type: Number,
		optional: true,
		defaultValue: 0
	},
	value_changed: {
		label: "Value Changed",
		type: String,
		optional: true
	},
	date_changed: {
		label: "Date Changed",
		type: String,
		optional: true
	},
	message: {
		label: "Message",
		type: String,
		optional: true
	},
	document_type: {
		label: "Document Type",
		type: String,
		optional: true
	},
	event: {
		label: "Event",
		type: String,
		optional: true
	},
	condition: {
		label: "Condition",
		type: String,
		optional: true
	},
	subject: {
		label: "Subject",
		type: String,
		optional: true
	}
});

this.EmailAlert.attachSchema(this.Schemas.EmailAlert);
