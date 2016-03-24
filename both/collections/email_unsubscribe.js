this.EmailUnsubscribe = new Mongo.Collection("email_unsubscribe");

this.EmailUnsubscribe.userCanInsert = function(userId, doc) {
	return true;
}

this.EmailUnsubscribe.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.EmailUnsubscribe.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.EmailUnsubscribe = new SimpleSchema({
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
	reference_doctype: {
		label: "Reference Doctype",
		type: String,
		optional: true
	},
	email: {
		label: "Email",
		type: String,
		optional: true
	},
	reference_name: {
		label: "Reference Name",
		type: String,
		optional: true
	},
	global_unsubscribe: {
		label: "Global Unsubscribe",
		type: Number,
		defaultValue: 0
	}
});

this.EmailUnsubscribe.attachSchema(this.Schemas.EmailUnsubscribe);
