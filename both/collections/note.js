this.Note = new Mongo.Collection("note");

this.Note.userCanInsert = function(userId, doc) {
	return true;
}

this.Note.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Note.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Note = new SimpleSchema({
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
	content: {
		label: "Content",
		type: String,
		optional: true
	},
	public: {
		label: "Public",
		type: Number,
		defaultValue: 0
	},
	title: {
		label: "Title",
		type: String,
		optional: true
	}
});

this.Note.attachSchema(this.Schemas.Note);
