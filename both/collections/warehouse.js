this.Warehouse = new Mongo.Collection("warehouse");

this.Warehouse.userCanInsert = function(userId, doc) {
	return true;
}

this.Warehouse.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Warehouse.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Warehouse = new SimpleSchema({
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
	city: {
		label: "City",
		type: String,
		optional: true
	},
	pin: {
		label: "PIN",
		type: Number,
		optional: true
	},
	email_id: {
		label: "Email Id",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	state: {
		label: "State",
		type: String,
		optional: true
	},
	disabled: {
		label: "Disabled",
		type: Number,
		defaultValue: 0
	},
	phone_no: {
		label: "Phone Number",
		type: String,
		optional: true
	},
	create_account_under: {
		label: "Create Account under",
		type: String,
		optional: true
	},
	mobile_no: {
		label: "Mobile Number",
		type: String,
		optional: true
	},
	warehouse_name: {
		label: "Warehouse Name",
		type: String,
		optional: true
	},
	address_line_2: {
		label: "Address Line 2",
		type: String,
		optional: true
	},
	address_line_1: {
		label: "Address Line 1",
		type: String,
		optional: true
	}
});

this.Warehouse.attachSchema(this.Schemas.Warehouse);
