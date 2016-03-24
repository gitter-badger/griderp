this.Feed = new Mongo.Collection("feed");

this.Feed.userCanInsert = function(userId, doc) {
	return true;
}

this.Feed.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Feed.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Feed = new SimpleSchema({
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
	doc_type: {
		label: "Document Type",
		type: String,
		optional: true
	},
	color: {
		label: "Color",
		type: String,
		optional: true
	},
	doc_name: {
		label: "Document Name",
		type: String,
		optional: true
	},
	feed_type: {
		label: "Feed Type",
		type: String,
		optional: true
	},
	full_name: {
		label: "Full Name",
		type: String,
		optional: true
	},
	subject: {
		label: "Subject",
		type: String,
		optional: true
	}
});

this.Feed.attachSchema(this.Schemas.Feed);
