this.BlockModule = new Mongo.Collection("block_module");

this.BlockModule.userCanInsert = function(userId, doc) {
	return true;
}

this.BlockModule.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.BlockModule.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.BlockModule = new SimpleSchema({
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
	module: {
		label: "Module",
		type: String,
		optional: true
	}
});

this.BlockModule.attachSchema(this.Schemas.BlockModule);
