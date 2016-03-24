this.SmsLog = new Mongo.Collection("sms_log");

this.SmsLog.userCanInsert = function(userId, doc) {
	return true;
}

this.SmsLog.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SmsLog.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SmsLog = new SimpleSchema({
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
	requested_numbers: {
		label: "Requested Numbers",
		type: String,
		optional: true
	},
	sender_name: {
		label: "Sender Name",
		type: String,
		optional: true
	},
	no_of_requested_sms: {
		label: "Number of Requested SMS",
		type: Number,
		optional: true
	},
	no_of_sent_sms: {
		label: "Number of Sent SMS",
		type: Number,
		optional: true
	},
	message: {
		label: "Message",
		type: String,
		optional: true
	},
	sent_to: {
		label: "Sent To",
		type: String,
		optional: true
	},
	sent_on: {
		label: "Sent On",
		type: Date,
		optional: true
	}
});

this.SmsLog.attachSchema(this.Schemas.SmsLog);
