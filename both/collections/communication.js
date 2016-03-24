this.Communication = new Mongo.Collection("communication");

this.Communication.userCanInsert = function(userId, doc) {
	return true;
}

this.Communication.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Communication.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Communication = new SimpleSchema({
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
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true,
		defaultValue: "COMM-"
	},
	email_account: {
		label: "Email Account",
		type: String,
		optional: true
	},
	subject: {
		label: "Subject",
		type: String,
		optional: true
	},
	reference_doctype: {
		label: "Reference Doctype",
		type: String,
		optional: true
	},
	unread_notification_sent: {
		label: "Unread Notification Sent",
		type: Number,
		defaultValue: 0
	},
	content: {
		label: "Content",
		type: String,
		optional: true
	},
	communication_medium: {
		label: "Communication Medium",
		type: String,
		optional: true
	},
	status: {
		label: "Status",
		type: String,
		optional: true
	},
	recipients: {
		label: "Recipients",
		type: String,
		optional: true
	},
	reference_name: {
		label: "Reference Name",
		type: String,
		optional: true
	},
	user: {
		label: "User",
		type: String,
		optional: true
	},
	delivery_status: {
		label: "Delivery Status",
		type: String,
		optional: true
	},
	_user_tags: {
		label: "User Tags",
		type: String,
		optional: true
	},
	sender: {
		label: "Sender",
		type: String,
		optional: true
	},
	sent_or_received: {
		label: "Sent or Received",
		type: String,
		optional: true
	},
	sender_full_name: {
		label: "Sender Full Name",
		type: String,
		optional: true
	},
	phone_no: {
		label: "Phone Number",
		type: String,
		optional: true
	},
	communication_date: {
		label: "Communication Date",
		type: Date,
		optional: true
	}
});

this.Communication.attachSchema(this.Schemas.Communication);
