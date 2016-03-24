this.Series = new Mongo.Collection("series");

this.Series.userCanInsert = function(userId, doc) {
	return true;
}

this.Series.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Series.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Series = new SimpleSchema({
	name: {
		label: "Name",
		type: String,
		optional: true
	},
	current: {
		label: "Current",
		type: Number,
		optional: true
	}
});

this.Series.attachSchema(this.Schemas.Series);
