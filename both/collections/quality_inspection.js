this.QualityInspection = new Mongo.Collection("quality_inspection");

this.QualityInspection.userCanInsert = function(userId, doc) {
	return true;
}

this.QualityInspection.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.QualityInspection.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.QualityInspection = new SimpleSchema({
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
	delivery_note_no: {
		label: "Delivery Note Number",
		type: String,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	report_date: {
		label: "Report Date",
		type: Date,
		optional: true
	},
	purchase_receipt_no: {
		label: "Purchase Receipt Number",
		type: String,
		optional: true
	},
	item_name: {
		label: "Item Name",
		type: String,
		optional: true
	},
	verified_by: {
		label: "Verified By",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	inspection_type: {
		label: "Inspection Type",
		type: String,
		optional: true
	},
	item_serial_no: {
		label: "Item Serial Number",
		type: String,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	remarks: {
		label: "Remarks",
		type: String,
		optional: true
	},
	inspected_by: {
		label: "Inspected By",
		type: String,
		optional: true,
		defaultValue: "User"
	},
	sample_size: {
		label: "Sample Size",
		type: Number,
		decimal: true,
		optional: true
	},
	batch_no: {
		label: "Batch Number",
		type: String,
		optional: true
	}
});

this.QualityInspection.attachSchema(this.Schemas.QualityInspection);
