this.WarrantyClaim = new Mongo.Collection("warranty_claim");

this.WarrantyClaim.userCanInsert = function(userId, doc) {
	return true;
}

this.WarrantyClaim.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.WarrantyClaim.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.WarrantyClaim = new SimpleSchema({
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
		defaultValue: "Open"
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	warranty_expiry_date: {
		label: "Warranty Expiry Date",
		type: Date,
		optional: true
	},
	service_address: {
		label: "Service Address",
		type: String,
		optional: true
	},
	resolved_by: {
		label: "Resolved By",
		type: String,
		optional: true
	},
	warranty_amc_status: {
		label: "Warranty AMC Status",
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
	complaint_date: {
		label: "Complaint Date",
		type: Date,
		optional: true
	},
	item_name: {
		label: "Item Name",
		type: String,
		optional: true
	},
	from_company: {
		label: "From Company",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	contact_display: {
		label: "Contact Display",
		type: String,
		optional: true
	},
	territory: {
		label: "Territory",
		type: String,
		optional: true
	},
	address_display: {
		label: "Address Display",
		type: String,
		optional: true
	},
	complaint: {
		label: "Complaint",
		type: String,
		optional: true
	},
	serial_no: {
		label: "Serial Number",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	complaint_raised_by: {
		label: "Complaint Raised By",
		type: String,
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
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	customer_address: {
		label: "Customer Address",
		type: String,
		optional: true
	},
	resolution_details: {
		label: "Resolution Details",
		type: String,
		optional: true
	},
	resolution_date: {
		label: "Resolution Date",
		type: Date,
		optional: true
	},
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	contact_mobile: {
		label: "Contact Mobile",
		type: String,
		optional: true
	},
	customer_group: {
		label: "Customer Group",
		type: String,
		optional: true
	},
	contact_email: {
		label: "Contact Email",
		type: String,
		optional: true
	},
	contact_person: {
		label: "Contact Person",
		type: String,
		optional: true
	}
});

this.WarrantyClaim.attachSchema(this.Schemas.WarrantyClaim);
