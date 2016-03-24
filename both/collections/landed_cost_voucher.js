this.LandedCostVoucher = new Mongo.Collection("landed_cost_voucher");

this.LandedCostVoucher.userCanInsert = function(userId, doc) {
	return true;
}

this.LandedCostVoucher.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.LandedCostVoucher.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.LandedCostVoucher = new SimpleSchema({
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
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	total_taxes_and_charges: {
		label: "Total Taxes and Charges",
		type: Number,
		decimal: true,
		optional: true
	},
	distribute_charges_based_on: {
		label: "Distribute Charges Based on",
		type: String,
		optional: true,
		defaultValue: "Amount"
	}
});

this.LandedCostVoucher.attachSchema(this.Schemas.LandedCostVoucher);
