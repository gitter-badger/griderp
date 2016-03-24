this.BomOperation = new Mongo.Collection("bom_operation");

this.BomOperation.userCanInsert = function(userId, doc) {
	return true;
}

this.BomOperation.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.BomOperation.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.BomOperation = new SimpleSchema({
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
	operating_cost: {
		label: "Operating Cost",
		type: Number,
		decimal: true,
		optional: true
	},
	workstation: {
		label: "Workstation",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	hour_rate: {
		label: "Hour Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	operation: {
		label: "Operation",
		type: String,
		optional: true
	},
	time_in_mins: {
		label: "Time In Minutes",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.BomOperation.attachSchema(this.Schemas.BomOperation);
