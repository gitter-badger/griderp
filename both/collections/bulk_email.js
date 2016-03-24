this.BulkEmail = new Mongo.Collection("bulk_email");

this.BulkEmail.userCanInsert = function(userId, doc) {
	return true;
}

this.BulkEmail.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.BulkEmail.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.BulkEmail = new SimpleSchema({
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
	status: {
		label: "Status",
		type: String,
		optional: true,
		defaultValue: "Not Sent"
	},
	reference_doctype: {
		label: "Reference Doctype",
		type: String,
		optional: true
	},
	sender: {
		label: "Sender",
		type: String,
		optional: true
	},
	reference_name: {
		label: "Reference Name",
		type: String,
		optional: true
	},
	send_after: {
		label: "Send After",
		type: Date,
		optional: true
	},
	error: {
		label: "Error",
		type: String,
		optional: true
	},
	message: {
		label: "Message",
		type: String,
		optional: true
	},
	recipient: {
		label: "Recipient",
		type: String,
		optional: true
	}
});

this.BulkEmail.attachSchema(this.Schemas.BulkEmail);
