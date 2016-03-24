this.Docshare = new Mongo.Collection("docshare");

this.Docshare.userCanInsert = function(userId, doc) {
	return true;
}

this.Docshare.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Docshare.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Docshare = new SimpleSchema({
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
	everyone: {
		label: "Everyone",
		type: Number,
		defaultValue: 0
	},
	share_name: {
		label: "Share Name",
		type: String,
		optional: true
	},
	read: {
		label: "Read",
		type: Number,
		defaultValue: 0
	},
	share: {
		label: "Share",
		type: Number,
		defaultValue: 0
	},
	write: {
		label: "Wrie",
		type: Number,
		defaultValue: 0
	},
	user: {
		label: "User",
		type: String,
		optional: true
	},
	share_doctype: {
		label: "Share Doctype",
		type: String,
		optional: true
	}
});

this.Docshare.attachSchema(this.Schemas.Docshare);
