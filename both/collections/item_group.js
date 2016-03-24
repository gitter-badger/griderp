this.ItemGroup = new Mongo.Collection("item_group");

this.ItemGroup.userCanInsert = function(userId, doc) {
	return true;
}

this.ItemGroup.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ItemGroup.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ItemGroup = new SimpleSchema({
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
	old_parent: {
		label: "Old Parent",
		type: String,
		optional: true
	},
	default_income_account: {
		label: "Default Income Account",
		type: String,
		optional: true
	},
	default_cost_center: {
		label: "Default Cost Center",
		type: String,
		optional: true
	},
	item_group_name: {
		label: "Item Group Name",
		type: String,
		optional: true
	},
	is_group: {
		label: "Is Group",
		type: String,
		optional: true
	},
	default_expense_account: {
		label: "Default Expense Account",
		type: String,
		optional: true
	},
	slideshow: {
		label: "Slideshow",
		type: String,
		optional: true
	},
	parent_website_route: {
		label: "Parent Website Route",
		type: String,
		optional: true
	},
	lft: {
		label: "Left",
		type: Number,
		optional: true
	},
	page_name: {
		label: "Page Name",
		type: String,
		optional: true
	},
	show_in_website: {
		label: "Show In Website",
		type: Number,
		defaultValue: 0
	},
	rgt: {
		label: "Right",
		type: Number,
		optional: true
	},
	parent_item_group: {
		label: "Parent Item Group",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	}
});

this.ItemGroup.attachSchema(this.Schemas.ItemGroup);
