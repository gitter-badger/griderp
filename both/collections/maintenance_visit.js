this.MaintenanceVisit = new Mongo.Collection("maintenance_visit");

this.MaintenanceVisit.userCanInsert = function(userId, doc) {
	return true;
}

this.MaintenanceVisit.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.MaintenanceVisit.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.MaintenanceVisit = new SimpleSchema({
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
		defaultValue: "Draft"
	},
	customer_name: {
		label: "Customer Name",
		type: String,
		optional: true
	},
	completion_status: {
		label: "Completion Status",
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
	maintenance_type: {
		label: "Maintenance Type",
		type: String,
		optional: true,
		defaultValue: "Unscheduled"
	},
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	customer_feedback: {
		label: "Customer Feedback",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
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
	mntc_time: {
		label: "MNTC Time",
		type: String,
		optional: true
	},
	contact_email: {
		label: "Contact Email",
		type: String,
		optional: true
	},
	contact_mobile: {
		label: "Contact Mobile",
		type: String,
		optional: true
	},
	mntc_date: {
		label: "MNTC Date",
		type: Date,
		optional: true
	},
	address_display: {
		label: "Address Display",
		type: String,
		optional: true
	},
	customer_group: {
		label: "Customer Group",
		type: String,
		optional: true
	},
	contact_person: {
		label: "Contact Person",
		type: String,
		optional: true
	}
});

this.MaintenanceVisit.attachSchema(this.Schemas.MaintenanceVisit);
