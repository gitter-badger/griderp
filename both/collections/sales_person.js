this.SalesPerson = new Mongo.Collection("sales_person");

this.SalesPerson.userCanInsert = function(userId, doc) {
	return true;
}

this.SalesPerson.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalesPerson.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalesPerson = new SimpleSchema({
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
	parent_sales_person: {
		label: "Parent Sales Person",
		type: String,
		optional: true
	},
	lft: {
		label: "Left",
		type: Number,
		optional: true
	},
	sales_person_name: {
		label: "Sales Person Name",
		type: String,
		optional: true
	},
	is_group: {
		label: "Is Group",
		type: String,
		optional: true
	},
	distribution_id: {
		label: "Distribution Id",
		type: String,
		optional: true
	},
	old_parent: {
		label: "Old Parent",
		type: String,
		optional: true
	},
	employee: {
		label: "Employee",
		type: String,
		optional: true
	},
	rgt: {
		label: "Right",
		type: Number,
		optional: true
	}
});

this.SalesPerson.attachSchema(this.Schemas.SalesPerson);
