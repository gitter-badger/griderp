this.Supplier = new Mongo.Collection("supplier");

this.Supplier.userCanInsert = function(userId, doc) {
	return true;
}

this.Supplier.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Supplier.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Supplier = new SimpleSchema({
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
	website: {
		label: "Website",
		type: String,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	default_taxes_and_charges: {
		label: "Default Taxes and Charges",
		type: String,
		optional: true
	},
	is_frozen: {
		label: "Is Frozen",
		type: Number,
		defaultValue: 0
	},
	default_price_list: {
		label: "Default Price List",
		type: String,
		optional: true
	},
	supplier_details: {
		label: "Supplier Details",
		type: String,
		optional: true
	},
	credit_days: {
		label: "Credit Days",
		type: Number,
		optional: true
	},
	supplier_name: {
		label: "Supplier Name",
		type: String,
		optional: true
	},
	supplier_type: {
		label: "Supplier Type",
		type: String,
		optional: true
	},
	default_currency: {
		label: "Default Currency",
		type: String,
		optional: true
	}
});

this.Supplier.attachSchema(this.Schemas.Supplier);
