this.MaintenanceSchedule = new Mongo.Collection("maintenance_schedule");

this.MaintenanceSchedule.userCanInsert = function(userId, doc) {
	return true;
}

this.MaintenanceSchedule.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.MaintenanceSchedule.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.MaintenanceSchedule = new SimpleSchema({
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
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	transaction_date: {
		label: "Transaction Date",
		type: Date,
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
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	customer_address: {
		label: "Customer Address",
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
	customer: {
		label: "Customer",
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

this.MaintenanceSchedule.attachSchema(this.Schemas.MaintenanceSchedule);
