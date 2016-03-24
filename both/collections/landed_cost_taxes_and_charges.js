this.LandedCostTaxesAndCharges = new Mongo.Collection("landed_cost_taxes_and_charges");

this.LandedCostTaxesAndCharges.userCanInsert = function(userId, doc) {
	return true;
}

this.LandedCostTaxesAndCharges.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.LandedCostTaxesAndCharges.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.LandedCostTaxesAndCharges = new SimpleSchema({
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
	amount: {
		label: "Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	}
});

this.LandedCostTaxesAndCharges.attachSchema(this.Schemas.LandedCostTaxesAndCharges);
