this.Comment = new Mongo.Collection("comment");

this.Comment.userCanInsert = function(userId, doc) {
	return true;
}

this.Comment.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Comment.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Comment = new SimpleSchema({
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
	comment: {
		label: "Comment",
		type: String,
		optional: true
	},
	reference_doctype: {
		label: "Reference Doctype",
		type: String,
		optional: true
	},
	comment_date: {
		label: "Comment Date",
		type: Date,
		optional: true
	},
	comment_type: {
		label: "Comment Type",
		type: String,
		optional: true
	},
	comment_by: {
		label: "Comment By",
		type: String,
		optional: true
	},
	reference_name: {
		label: "Reference Name",
		type: String,
		optional: true
	},
	post_topic: {
		label: "Post Topic",
		type: String,
		optional: true
	},
	comment_docname: {
		label: "Comment Docname",
		type: String,
		optional: true
	},
	comment_time: {
		label: "Comment Time",
		type: String,
		optional: true
	},
	unsubscribed: {
		label: "Unsubscribed",
		type: Number,
		defaultValue: 0
	},
	comment_doctype: {
		label: "Comment Doctype",
		type: String,
		optional: true
	},
	comment_by_fullname: {
		label: "Comment By FullName",
		type: String,
		optional: true
	}
});

this.Comment.attachSchema(this.Schemas.Comment);
