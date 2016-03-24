this.Newsletter = new Mongo.Collection("newsletter");

this.Newsletter.userCanInsert = function(userId, doc) {
	return true;
}

this.Newsletter.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Newsletter.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Newsletter = new SimpleSchema({
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
	send_from: {
		label: "Send From",
		type: String,
		optional: true
	},
	email_sent: {
		label: "Email Sent",
		type: Number,
		defaultValue: 0
	},
	message: {
		label: "Message",
		type: String,
		optional: true
	},
	newsletter_list: {
		label: "Newsletter List",
		type: String,
		optional: true
	},
	test_email_id: {
		label: "Test Email Id",
		type: String,
		optional: true
	},
	subject: {
		label: "Subject",
		type: String,
		optional: true
	}
});

this.Newsletter.attachSchema(this.Schemas.Newsletter);
