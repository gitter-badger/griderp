this.Workstation = new Mongo.Collection("workstation");

this.Workstation.userCanInsert = function(userId, doc) {
	return true;
}

this.Workstation.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Workstation.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Workstation = new SimpleSchema({
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
	hour_rate_rent: {
		label: "Hour Rate Rent",
		type: Number,
		decimal: true,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	hour_rate_electricity: {
		label: "Hour Rate Electricity",
		type: Number,
		decimal: true,
		optional: true
	},
	hour_rate_labour: {
		label: "Hour Rate Labour",
		type: Number,
		decimal: true,
		optional: true
	},
	hour_rate: {
		label: "Hour Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	holiday_list: {
		label: "Holiday List",
		type: String,
		optional: true
	},
	hour_rate_consumable: {
		label: "Hour Rate Consumable",
		type: Number,
		decimal: true,
		optional: true
	},
	workstation_name: {
		label: "Workstation Name",
		type: String,
		optional: true
	}
});

this.Workstation.attachSchema(this.Schemas.Workstation);
