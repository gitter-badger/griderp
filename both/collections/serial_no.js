this.SerialNo = new Mongo.Collection("serial_no");

this.SerialNo.userCanInsert = function(userId, doc) {
	return true;
}

this.SerialNo.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SerialNo.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SerialNo = new SimpleSchema({
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
	purchase_time: {
		label: "Purchase Time",
		type: String,
		optional: true
	},
	delivery_document_type: {
		label: "Delivery Document Type",
		type: String,
		optional: true
	},
	serial_no: {
		label: "Serial Number",
		type: String,
		optional: true
	},
	purchase_document_no: {
		label: "Purchase Document Number",
		type: String,
		optional: true
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
	amc_expiry_date: {
		label: "AMC Expiry Date",
		type: Date,
		optional: true
	},
	purchase_rate: {
		label: "Purchase Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	item_name: {
		label: "Item Name",
		type: String,
		optional: true
	},
	brand: {
		label: "Brand",
		type: String,
		optional: true
	},
	purchase_document_type: {
		label: "Purchase Document Type",
		type: String,
		optional: true
	},
	status: {
		label: "Status",
		type: String,
		optional: true,
		defaultValue: "Not Available"
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	purchase_date: {
		label: "Purchase Date",
		type: Date,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	warehouse: {
		label: "Warehouse",
		type: String,
		optional: true
	},
	supplier_name: {
		label: "Supplier Name",
		type: String,
		optional: true
	},
	is_cancelled: {
		label: "Is Cancelled",
		type: String,
		optional: true
	},
	maintenance_status: {
		label: "Maintenance Status",
		type: String,
		optional: true
	},
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	delivery_time: {
		label: "Delivery Time",
		type: String,
		optional: true
	},
	delivery_document_no: {
		label: "Delivery Document Number",
		type: String,
		optional: true
	},
	item_group: {
		label: "Item Group",
		type: String,
		optional: true
	},
	warranty_period: {
		label: "Warranty Period",
		type: Number,
		optional: true
	},
	serial_no_details: {
		label: "Serial Number Details",
		type: String,
		optional: true
	},
	warranty_expiry_date: {
		label: "Warranty Expiry Date",
		type: Date,
		optional: true
	},
	delivery_date: {
		label: "Delivery Date",
		type: Date,
		optional: true
	}
});

this.SerialNo.attachSchema(this.Schemas.SerialNo);
