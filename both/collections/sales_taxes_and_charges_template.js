this.SalesTaxesAndChargesTemplate = new Mongo.Collection("sales_taxes_and_charges_template");

this.SalesTaxesAndChargesTemplate.userCanInsert = function(userId, doc) {
	return true;
}

this.SalesTaxesAndChargesTemplate.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalesTaxesAndChargesTemplate.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalesTaxesAndChargesTemplate = new SimpleSchema({
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
	disabled: {
		label: "Disabled",
		type: Number,
		defaultValue: 0
	},
	title: {
		label: "Title",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	is_default: {
		label: "Is Default",
		type: Number,
		defaultValue: 0
	}
});

this.SalesTaxesAndChargesTemplate.attachSchema(this.Schemas.SalesTaxesAndChargesTemplate);
