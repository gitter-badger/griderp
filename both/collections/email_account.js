this.EmailAccount = new Mongo.Collection("email_account");

this.EmailAccount.userCanInsert = function(userId, doc) {
	return true;
}

this.EmailAccount.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.EmailAccount.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.EmailAccount = new SimpleSchema({
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
	default_outgoing: {
		label: "Default Outgoing",
		type: Number,
		defaultValue: 0
	},
	login_id: {
		label: "Login id",
		type: String,
		optional: true
	},
	email_id: {
		label: "Email Id",
		type: String,
		optional: true
	},
	unreplied_for_mins: {
		label: "Unreplied For Minutes",
		type: Number,
		optional: true
	},
	use_ssl: {
		label: "Use SSL",
		type: Number,
		defaultValue: 0
	},
	always_use_account_email_id_as_sender: {
		label: "Always Use Account Email Id as Sender",
		type: Number,
		defaultValue: 0
	},
	send_notification_to: {
		label: "Send Notification To",
		type: String,
		optional: true
	},
	default_incoming: {
		label: "Default Incoming",
		type: Number,
		defaultValue: 0
	},
	service: {
		label: "Service",
		type: String,
		optional: true
	},
	smtp_port: {
		label: "SMTP Port",
		type: String,
		optional: true
	},
	smtp_server: {
		label: "SMTP Server",
		type: String,
		optional: true
	},
	use_tls: {
		label: "Use TLS",
		type: Number,
		defaultValue: 0
	},
	enable_incoming: {
		label: "Enable Incoming",
		type: Number,
		defaultValue: 0
	},
	attachment_limit: {
		label: "Attachment Limit",
		type: Number,
		optional: true,
		defaultValue: 1
	},
	pop3_server: {
		label: "POP3 Server",
		type: String,
		optional: true
	},
	enable_auto_reply: {
		label: "Enable Auto Reply",
		type: Number,
		defaultValue: 0
	},
	enable_outgoing: {
		label: "Enable Outgoing",
		type: Number,
		defaultValue: 0
	},
	add_signature: {
		label: "Add Signature",
		type: Number,
		defaultValue: 0
	},
	password: {
		label: "Password",
		type: String,
		optional: true
	},
	email_account_name: {
		label: "Email Account Name",
		type: String,
		optional: true
	},
	footer: {
		label: "Footer",
		type: String,
		optional: true
	},
	auto_reply_message: {
		label: "Auto Reply Message",
		type: String,
		optional: true
	},
	login_id_is_different: {
		label: "Logn Id is Different",
		type: Number,
		defaultValue: 0
	},
	append_to: {
		label: "Append To",
		type: String,
		optional: true
	},
	signature: {
		label: "Signature",
		type: String,
		optional: true
	},
	notify_if_unreplied: {
		label: "Notify If Unreplied",
		type: Number,
		defaultValue: 0
	}
});

this.EmailAccount.attachSchema(this.Schemas.EmailAccount);
