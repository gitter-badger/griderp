this.Holiday = new Mongo.Collection("holiday");

this.Holiday.userCanInsert = function(userId, doc) {
	return true;
}

this.Holiday.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Holiday.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Holiday = new SimpleSchema({
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
	holiday_date: {
		label: "Holiday Date",
		type: Date,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	}
});

this.Holiday.attachSchema(this.Schemas.Holiday);
