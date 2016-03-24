this.Batch = new Mongo.Collection("batch");

this.Batch.userCanInsert = function(userId, doc) {
	return true;
}

this.Batch.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Batch.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Batch = new SimpleSchema({
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
	item: {
		label: "Item",
		type: String,
		optional: true
	},
	expiry_date: {
		label: "Expiry Date",
		type: Date,
		optional: true
	},
	batch_id: {
		label: "Batch Id",
		type: String,
		optional: true
	}
});

this.Batch.attachSchema(this.Schemas.Batch);
