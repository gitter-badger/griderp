this.ActivityType = new Mongo.Collection("activity_type");

this.ActivityType.userCanInsert = function(userId, doc) {
	return true;
}

this.ActivityType.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ActivityType.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ActivityType = new SimpleSchema({
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
	activity_type: {
		label: "Activity Type",
		type: String,
		optional: true
	}
});

this.ActivityType.attachSchema(this.Schemas.ActivityType);
