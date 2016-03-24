this.ActivityCost = new Mongo.Collection("activity_cost");

this.ActivityCost.userCanInsert = function(userId, doc) {
	return true;
}

this.ActivityCost.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ActivityCost.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ActivityCost = new SimpleSchema({
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
	title: {
		label: "Title",
		type: String,
		optional: true
	},
	billing_rate: {
		label: "Billing Rate",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	costing_rate: {
		label: "Costing Rate",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	employee_name: {
		label: "Employee Name",
		type: String,
		optional: true
	},
	employee: {
		label: "Employee",
		type: String,
		optional: true
	},
	activity_type: {
		label: "Activity Type",
		type: String,
		optional: true
	}
});

this.ActivityCost.attachSchema(this.Schemas.ActivityCost);
