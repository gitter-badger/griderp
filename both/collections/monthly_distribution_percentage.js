this.MonthlyDistributionPercentage = new Mongo.Collection("monthly_distribution_percentage");

this.MonthlyDistributionPercentage.userCanInsert = function(userId, doc) {
	return true;
}

this.MonthlyDistributionPercentage.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.MonthlyDistributionPercentage.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.MonthlyDistributionPercentage = new SimpleSchema({
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
	percentage_allocation: {
		label: "Percentage Allocation",
		type: Number,
		decimal: true,
		optional: true
	},
	month: {
		label: "Month",
		type: String,
		optional: true
	}
});

this.MonthlyDistributionPercentage.attachSchema(this.Schemas.MonthlyDistributionPercentage);
