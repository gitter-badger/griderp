this.DeductionType = new Mongo.Collection("deduction_type");

this.DeductionType.userCanInsert = function(userId, doc) {
	return true;
}

this.DeductionType.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.DeductionType.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.DeductionType = new SimpleSchema({
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
	deduction_name: {
		label: "Deduction Name",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	}
});

this.DeductionType.attachSchema(this.Schemas.DeductionType);
