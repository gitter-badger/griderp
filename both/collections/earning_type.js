this.EarningType = new Mongo.Collection("earning_type");

this.EarningType.userCanInsert = function(userId, doc) {
	return true;
}

this.EarningType.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.EarningType.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.EarningType = new SimpleSchema({
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
	earning_name: {
		label: "Earning Name",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	}
});

this.EarningType.attachSchema(this.Schemas.EarningType);
