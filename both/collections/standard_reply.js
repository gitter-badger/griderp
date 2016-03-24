this.StandardReply = new Mongo.Collection("standard_reply");

this.StandardReply.userCanInsert = function(userId, doc) {
	return true;
}

this.StandardReply.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.StandardReply.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.StandardReply = new SimpleSchema({
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
	response: {
		label: "Response",
		type: String,
		optional: true
	},
	subject: {
		label: "Subject",
		type: String,
		optional: true
	}
});

this.StandardReply.attachSchema(this.Schemas.StandardReply);
