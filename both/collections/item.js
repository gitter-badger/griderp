this.Item = new Mongo.Collection("item");

this.Item.userCanInsert = function(userId, doc) {
	return true;
}

this.Item.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Item.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Item = new SimpleSchema({
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
	default_supplier: {
		label: "Default Supplier",
		type: String,
		optional: true
	},
	selling_cost_center: {
		label: "Selling Cost Center",
		type: String,
		optional: true
	},
	net_weight: {
		label: "Net Weight",
		type: Number,
		decimal: true,
		optional: true
	},
	expense_account: {
		label: "Expense Account",
		type: String,
		optional: true
	},
	max_discount: {
		label: "Max Discount",
		type: Number,
		decimal: true,
		optional: true
	},
	income_account: {
		label: "Income Account",
		type: String,
		optional: true
	},
	item_name: {
		label: "Item Name",
		type: String,
		optional: true
	},
	website_warehouse: {
		label: "Website Warehouse",
		type: String,
		optional: true
	},
	page_name: {
		label: "Page Name",
		type: String,
		optional: true
	},
	item_group: {
		label: "Item Group",
		type: String,
		optional: true
	},
	web_long_description: {
		label: "Web Long Description",
		type: String,
		optional: true
	},
	is_service_item: {
		label: "Is Service Item",
		type: Number,
		defaultValue: 0
	},
	valuation_method: {
		label: "Valuation Method",
		type: String,
		optional: true
	},
	parent_website_route: {
		label: "Parent Website Route",
		type: String,
		optional: true
	},
	warranty_period: {
		label: "Warranty Period",
		type: String,
		optional: true
	},
	has_variants: {
		label: "Has Variants",
		type: Number,
		defaultValue: 0
	},
	re_order_level: {
		label: "Reorder Level",
		type: Number,
		decimal: true,
		optional: true
	},
	default_warehouse: {
		label: "Default Warehouse",
		type: String,
		optional: true
	},
	is_sales_item: {
		label: "Is Sales Item",
		type: Number,
		defaultValue: 1
	},
	is_sub_contracted_item: {
		label: "Is Subcontracted Item",
		type: Number,
		defaultValue: 0
	},
	tolerance: {
		label: "Tolerance",
		type: Number,
		decimal: true,
		optional: true
	},
	customer_code: {
		label: "Customer Code",
		type: String,
		optional: true
	},
	barcode: {
		label: "Barcode",
		type: String,
		optional: true
	},
	is_stock_item: {
		label: "Is Stock Item",
		type: Number,
		defaultValue: 1
	},
	manufacturer: {
		label: "Manufacturer",
		type: String,
		optional: true
	},
	min_order_qty: {
		label: "Minimum Order Quantity",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	},
	image: {
		label: "Image",
		type: String,
		optional: true
	},
	slideshow: {
		label: "Slideshow",
		type: String,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	show_in_website: {
		label: "Show in Website",
		type: Number,
		defaultValue: 0
	},
	re_order_qty: {
		label: "Reorder Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	is_purchase_item: {
		label: "Is Purchase Item",
		type: Number,
		defaultValue: 1
	},
	weight_uom: {
		label: "Weight UOM",
		type: String,
		optional: true
	},
	variant_of: {
		label: "Variant Of",
		type: String,
		optional: true
	},
	manufacturer_part_no: {
		label: "Manufacturer Part Number",
		type: String,
		optional: true
	},
	last_purchase_rate: {
		label: "Last Purchase Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	website_image: {
		label: "Website Image",
		type: String,
		optional: true
	},
	buying_cost_center: {
		label: "Buying Cost Center",
		type: String,
		optional: true
	},
	publish_in_hub: {
		label: "Publish In Hub",
		type: Number,
		defaultValue: 0
	},
	serial_no_series: {
		label: "Serial Number Series",
		type: String,
		optional: true
	},
	is_asset_item: {
		label: "Is Asset Item",
		type: Number,
		defaultValue: 0
	},
	is_pro_applicable: {
		label: "Is Pro Applicable",
		type: Number,
		defaultValue: 0
	},
	end_of_life: {
		label: "End Of Life",
		type: Date,
		optional: true
	},
	synced_with_hub: {
		label: "Synced With Hub",
		type: Number,
		defaultValue: 0
	},
	stock_uom: {
		label: "Stock UOM",
		type: String,
		optional: true
	},
	brand: {
		label: "Brand",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	inspection_required: {
		label: "Inspection Required",
		type: Number,
		defaultValue: 0
	},
	default_bom: {
		label: "Default BOM",
		type: String,
		optional: true
	},
	weightage: {
		label: "Weightage",
		type: Number,
		optional: true
	},
	apply_warehouse_wise_reorder_level: {
		label: "Apply Warehouse Wise Reorder Level",
		type: Number,
		defaultValue: 0
	},
	lead_time_days: {
		label: "Lead Time Days",
		type: Number,
		optional: true
	},
	has_batch_no: {
		label: "Has Batch Number",
		type: Number,
		defaultValue: 0
	},
	has_serial_no: {
		label: "Has Serial Number",
		type: Number,
		defaultValue: 0
	}
});

this.Item.attachSchema(this.Schemas.Item);
