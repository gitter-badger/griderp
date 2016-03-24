this.Singles = new Mongo.Collection("singles");

this.Singles.userCanInsert = function(userId, doc) {
	return true;
}

this.Singles.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Singles.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Singles = new SimpleSchema({
	doctype: {
		label: "Doctype",
		type: String,
		optional: true
	},
	field: {
		label: "Field",
		type: String,
		optional: true
	},
	value: {
		label: "Value",
		type: String,
		optional: true
	}
});

this.Singles.attachSchema(this.Schemas.Singles);
