this.QuotationItem = new Mongo.Collection("quotation_item");

this.QuotationItem.userCanInsert = function(userId, doc) {
	return true;
}

this.QuotationItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.QuotationItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.QuotationItem = new SimpleSchema({
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
	base_price_list_rate: {
		label: "Base Price List Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	image: {
		label: "Image",
		type: String,
		optional: true
	},
	base_amount: {
		label: "Base Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	qty: {
		label: "Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	item_tax_rate: {
		label: "Item Tax Rate",
		type: String,
		optional: true
	},
	rate: {
		label: "Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	page_break: {
		label: "Page Break",
		type: Number,
		defaultValue: 0
	},
	base_net_rate: {
		label: "Base Net Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	discount_percentage: {
		label: "Discount Percentage",
		type: Number,
		decimal: true,
		optional: true
	},
	item_name: {
		label: "Item Name",
		type: String,
		optional: true
	},
	base_net_amount: {
		label: "Base Net Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	net_rate: {
		label: "Net Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	stock_uom: {
		label: "Stock UOM",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	prevdoc_docname: {
		label: "Prevdoc Docname",
		type: String,
		optional: true
	},
	brand: {
		label: "Brand",
		type: String,
		optional: true
	},
	base_rate: {
		label: "Base Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	pricing_rule: {
		label: "Pricing Rule",
		type: String,
		optional: true
	},
	price_list_rate: {
		label: "Price List Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	item_group: {
		label: "Item Group",
		type: String,
		optional: true
	},
	amount: {
		label: "Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	customer_item_code: {
		label: "Customer Item Code",
		type: String,
		optional: true
	},
	net_amount: {
		label: "Net Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	prevdoc_doctype: {
		label: "Prevdoc Doctype",
		type: String,
		optional: true
	}
});

this.QuotationItem.attachSchema(this.Schemas.QuotationItem);
