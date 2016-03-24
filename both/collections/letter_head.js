this.LetterHead = new Mongo.Collection("letter_head");

this.LetterHead.userCanInsert = function(userId, doc) {
	return true;
}

this.LetterHead.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.LetterHead.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.LetterHead = new SimpleSchema({
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
	disabled: {
		label: "Disabled",
		type: Number,
		defaultValue: 0
	},
	is_default: {
		label: "Is Default",
		type: Number,
		defaultValue: 0
	},
	content: {
		label: "Content",
		type: String,
		optional: true
	},
	letter_head_name: {
		label: "Letter Head Name",
		type: String,
		optional: true
	}
});

this.LetterHead.attachSchema(this.Schemas.LetterHead);
