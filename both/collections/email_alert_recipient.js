this.EmailAlertRecipient = new Mongo.Collection("email_alert_recipient");

this.EmailAlertRecipient.userCanInsert = function(userId, doc) {
	return true;
}

this.EmailAlertRecipient.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.EmailAlertRecipient.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.EmailAlertRecipient = new SimpleSchema({
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
	cc: {
		label: "CC",
		type: String,
		optional: true
	},
	email_by_document_field: {
		label: "Email By Document Field",
		type: String,
		optional: true
	},
	condition: {
		label: "Condition",
		type: String,
		optional: true
	}
});

this.EmailAlertRecipient.attachSchema(this.Schemas.EmailAlertRecipient);
