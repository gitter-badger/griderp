this.PrintHeading = new Mongo.Collection("print_heading");

this.PrintHeading.userCanInsert = function(userId, doc) {
	return true;
}

this.PrintHeading.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PrintHeading.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PrintHeading = new SimpleSchema({
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
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	print_heading: {
		label: "Print Heading",
		type: String,
		optional: true
	}
});

this.PrintHeading.attachSchema(this.Schemas.PrintHeading);
