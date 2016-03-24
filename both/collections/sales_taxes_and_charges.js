this.SalesTaxesAndCharges = new Mongo.Collection("sales_taxes_and_charges");

this.SalesTaxesAndCharges.userCanInsert = function(userId, doc) {
	return true;
}

this.SalesTaxesAndCharges.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalesTaxesAndCharges.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalesTaxesAndCharges = new SimpleSchema({
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
	charge_type: {
		label: "Charge Type",
		type: String,
		optional: true
	},
	total: {
		label: "Total",
		type: Number,
		decimal: true,
		optional: true
	},
	tax_amount: {
		label: "Tax Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	item_wise_tax_detail: {
		label: "Item Wise Tax Detail",
		type: String,
		optional: true
	},
	base_tax_amount_after_discount_amount: {
		label: "Base Tax Amount After Discount Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	row_id: {
		label: "Row Id",
		type: String,
		optional: true
	},
	base_total: {
		label: "Base Total",
		type: Number,
		decimal: true,
		optional: true
	},
	rate: {
		label: "Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	included_in_print_rate: {
		label: "Included in Print Rate",
		type: Number,
		defaultValue: 0
	},
	account_head: {
		label: "Account Head",
		type: String,
		optional: true
	},
	tax_amount_after_discount_amount: {
		label: "Tax Amount After Discount Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	cost_center: {
		label: "Cost Center",
		type: String,
		optional: true
	},
	base_tax_amount: {
		label: "Base Tax Amount",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.SalesTaxesAndCharges.attachSchema(this.Schemas.SalesTaxesAndCharges);
