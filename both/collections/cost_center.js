this.CostCenter = new Mongo.Collection("cost_center");

this.CostCenter.userCanInsert = function(userId, doc) {
	return true;
}

this.CostCenter.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.CostCenter.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.CostCenter = new SimpleSchema({
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
	rgt: {
		label: "Right",
		type: Number,
		optional: true
	},
	cost_center_name: {
		label: "Cost Center Name",
		type: String,
		optional: true
	},
	lft: {
		label: "Left",
		type: Number,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	is_group: {
		label: "Is Group",
		type: Number,
		defaultValue: 0
	},
	old_parent: {
		label: "Old Parent",
		type: String,
		optional: true
	},
	distribution_id: {
		label: "Distribution Id",
		type: String,
		optional: true
	},
	parent_cost_center: {
		label: "Parent Cost Center",
		type: String,
		optional: true
	}
});

this.CostCenter.attachSchema(this.Schemas.CostCenter);
