this.MonthlyDistribution = new Mongo.Collection("monthly_distribution");

this.MonthlyDistribution.userCanInsert = function(userId, doc) {
	return true;
}

this.MonthlyDistribution.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.MonthlyDistribution.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.MonthlyDistribution = new SimpleSchema({
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
	distribution_id: {
		label: "Distribution Id",
		type: String,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	}
});

this.MonthlyDistribution.attachSchema(this.Schemas.MonthlyDistribution);
