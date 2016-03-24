this.PricingRule = new Mongo.Collection("pricing_rule");

this.PricingRule.userCanInsert = function(userId, doc) {
	return true;
}

this.PricingRule.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PricingRule.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PricingRule = new SimpleSchema({
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
	price_or_discount: {
		label: "Price or Discount",
		type: String,
		optional: true,
		defaultValue: "Discount Percentage"
	},
	campaign: {
		label: "Campaign",
		type: String,
		optional: true
	},
	price: {
		label: "Price",
		type: Number,
		decimal: true,
		optional: true
	},
	for_price_list: {
		label: "For Price List",
		type: String,
		optional: true
	},
	min_qty: {
		label: "Minimum Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	valid_from: {
		label: "Valid From",
		type: Date,
		optional: true
	},
	title: {
		label: "Title",
		type: String,
		optional: true
	},
	priority: {
		label: "Priority",
		type: String,
		optional: true
	},
	supplier: {
		label: "Supplier",
		type: String,
		optional: true
	},
	territory: {
		label: "Territory",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	sales_partner: {
		label: "Sales Partner",
		type: String,
		optional: true
	},
	discount_percentage: {
		label: "Discount Percentage",
		type: Number,
		decimal: true,
		optional: true
	},
	selling: {
		label: "Selling",
		type: Number,
		defaultValue: 0
	},
	applicable_for: {
		label: "Applicable For",
		type: String,
		optional: true
	},
	brand: {
		label: "Brand",
		type: String,
		optional: true
	},
	apply_on: {
		label: "Apply On",
		type: String,
		optional: true,
		defaultValue: "Item Code"
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	disable: {
		label: "Disable",
		type: Number,
		defaultValue: 0
	},
	max_qty: {
		label: "Maximum Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	supplier_type: {
		label: "Supplier Type",
		type: String,
		optional: true
	},
	buying: {
		label: "Buying",
		type: Number,
		defaultValue: 0
	},
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	valid_upto: {
		label: "Valid Up To",
		type: Date,
		optional: true
	},
	customer_group: {
		label: "Customer Group",
		type: String,
		optional: true
	},
	item_group: {
		label: "Item Group",
		type: String,
		optional: true
	}
});

this.PricingRule.attachSchema(this.Schemas.PricingRule);
