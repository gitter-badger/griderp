this.TaxRule = new Mongo.Collection("tax_rule");

this.TaxRule.userCanInsert = function(userId, doc) {
	return true;
}

this.TaxRule.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.TaxRule.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.TaxRule = new SimpleSchema({
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
	sales_tax_template: {
		label: "Sales Tax Template",
		type: String,
		optional: true
	},
	to_date: {
		label: "To Date",
		type: Date,
		optional: true
	},
	billing_country: {
		label: "Billing Company",
		type: String,
		optional: true
	},
	use_for_shopping_cart: {
		label: "Use for Shopping Cart",
		type: String
	},
	tax_type: {
		label: "Tax Type",
		type: String,
		optional: true
	},
	priority: {
		label: "Priority",
		type: Number,
		optional: true,
		defaultValue: 1
	},
	from_date: {
		label: "From Date",
		type: Date,
		optional: true
	},
	supplier: {
		label: "Supplier",
		type: String,
		optional: true
	},
	shipping_city: {
		label: "Shipping City",
		type: String,
		optional: true
	},
	purchase_tax_template: {
		label: "Purchase Tax Template",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	shipping_state: {
		label: "Shipping State",
		type: String,
		optional: true
	},
	supplier_type: {
		label: "Supplier Type",
		type: String,
		optional: true
	},
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	billing_city: {
		label: "Billing City",
		type: String,
		optional: true
	},
	customer_group: {
		label: "Customer Group",
		type: String,
		optional: true
	},
	shipping_country: {
		label: "Shipping Country",
		type: String,
		optional: true
	},
	billing_state: {
		label: "Billing State",
		type: String,
		optional: true
	}
});

this.TaxRule.attachSchema(this.Schemas.TaxRule);
