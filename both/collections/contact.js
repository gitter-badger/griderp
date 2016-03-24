this.Contact = new Mongo.Collection("contact");

this.Contact.userCanInsert = function(userId, doc) {
	return true;
}

this.Contact.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Contact.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Contact = new SimpleSchema({
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
	status: {
		label: "Status",
		type: String,
		optional: true,
		defaultValue: "Passive"
	},
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	first_name: {
		label: "First Name",
		type: String,
		optional: true
	},
	sales_partner: {
		label: "Sales Partner",
		type: String,
		optional: true
	},
	designation: {
		label: "Designation",
		type: String,
		optional: true
	},
	email_id: {
		label: "Email Id",
		type: String,
		optional: true
	},
	supplier_name: {
		label: "Supplier Name",
		type: String,
		optional: true
	},
	mobile_no: {
		label: "Mobile Number",
		type: String,
		optional: true
	},
	department: {
		label: "Department",
		type: String,
		optional: true
	},
	phone: {
		label: "Phone",
		type: String,
		optional: true
	},
	last_name: {
		label: "Last Name",
		type: String,
		optional: true
	},
	unsubscribed: {
		label: "Unsubscribed",
		type: Number,
		defaultValue: 0
	},
	supplier: {
		label: "Supplier",
		type: String,
		optional: true
	},
	customer_name: {
		label: "Customer Name",
		type: String,
		optional: true
	},
	is_primary_contact: {
		label: "Is Primary Contact",
		type: Number,
		defaultValue: 0
	}
});

this.Contact.attachSchema(this.Schemas.Contact);
