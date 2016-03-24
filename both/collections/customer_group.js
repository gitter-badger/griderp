this.CustomerGroup = new Mongo.Collection("customer_group");

this.CustomerGroup.userCanInsert = function(userId, doc) {
	return true;
}

this.CustomerGroup.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.CustomerGroup.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.CustomerGroup = new SimpleSchema({
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
	credit_limit: {
		label: "Credit Limit",
		type: Number,
		decimal: true,
		optional: true
	},
	rgt: {
		label: "Right",
		type: Number,
		optional: true
	},
	default_price_list: {
		label: "Default Price List",
		type: String,
		optional: true
	},
	credit_days_based_on: {
		label: "Credit Days Based On",
		type: String,
		optional: true
	},
	parent_customer_group: {
		label: "Parent Customer Group",
		type: String,
		optional: true
	},
	is_group: {
		label: "Is Group",
		type: String,
		optional: true
	},
	old_parent: {
		label: "Old Parent",
		type: String,
		optional: true
	},
	lft: {
		label: "Left",
		type: Number,
		optional: true
	},
	customer_group_name: {
		label: "Customer Group Name",
		type: String,
		optional: true
	},
	credit_days: {
		label: "Credit Days",
		type: Number,
		optional: true
	}
});

this.CustomerGroup.attachSchema(this.Schemas.CustomerGroup);
