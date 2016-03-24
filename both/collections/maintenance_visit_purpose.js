this.MaintenanceVisitPurpose = new Mongo.Collection("maintenance_visit_purpose");

this.MaintenanceVisitPurpose.userCanInsert = function(userId, doc) {
	return true;
}

this.MaintenanceVisitPurpose.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.MaintenanceVisitPurpose.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.MaintenanceVisitPurpose = new SimpleSchema({
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
	work_done: {
		label: "Work Done",
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
	prevdoc_detail_docname: {
		label: "Prevdoc Detail Docname",
		type: String,
		optional: true
	},
	item_name: {
		label: "Item Name",
		type: String,
		optional: true
	},
	serial_no: {
		label: "Serial Number",
		type: String,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	service_person: {
		label: "Service Person",
		type: String,
		optional: true
	},
	prevdoc_doctype: {
		label: "Prevdoc Doctype",
		type: String,
		optional: true
	}
});

this.MaintenanceVisitPurpose.attachSchema(this.Schemas.MaintenanceVisitPurpose);
