this.Brand = new Mongo.Collection("brand");

this.Brand.userCanInsert = function(userId, doc) {
	return true;
}

this.Brand.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Brand.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Brand = new SimpleSchema({
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
	brand: {
		label: "Brand",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	}
});

this.Brand.attachSchema(this.Schemas.Brand);
