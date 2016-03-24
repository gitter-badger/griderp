this.Address = new Mongo.Collection("address");

this.Address.userCanInsert = function(userId, doc) {
	return true;
}

this.Address.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Address.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Address = new SimpleSchema({
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
	email_id: {
		label: "Email Id",
		type: String,
		optional: true
	},
	pincode: {
		label: "PIN Code",
		type: String,
		optional: true
	},
	lead_name: {
		label: "Lead Name",
		type: String,
		optional: true
	},
	customer_name: {
		label: "Customer Name",
		type: String,
		optional: true
	},
	address_line2: {
		label: "Address Line2",
		type: String,
		optional: true
	},
	city: {
		label: "City",
		type: String,
		optional: true
	},
	address_line1: {
		label: "Address Line1",
		type: String,
		optional: true
	},
	lead: {
		label: "Lead",
		type: String,
		optional: true
	},
	is_primary_address: {
		label: "Is Primary Address",
		type: Number,
		defaultValue: 0
	},
	state: {
		label: "State",
		type: String,
		optional: true
	},
	supplier: {
		label: "Supplier",
		type: String,
		optional: true
	},
	address_type: {
		label: "Address Type",
		type: String,
		optional: true
	},
	sales_partner: {
		label: "Sales Partner",
		type: String,
		optional: true
	},
	fax: {
		label: "Fax",
		type: String,
		optional: true
	},
	address_title: {
		label: "Address Title",
		type: String,
		optional: true
	},
	phone: {
		label: "Phone",
		type: String,
		optional: true
	},
	supplier_name: {
		label: "Supplier Name",
		type: String,
		optional: true
	},
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	country: {
		label: "Country",
		type: String,
		optional: true
	},
	is_shipping_address: {
		label: "Is Shipping Address",
		type: Number,
		defaultValue: 0
	}
});

this.Address.attachSchema(this.Schemas.Address);
