this.MaintenanceScheduleItem = new Mongo.Collection("maintenance_schedule_item");

this.MaintenanceScheduleItem.userCanInsert = function(userId, doc) {
	return true;
}

this.MaintenanceScheduleItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.MaintenanceScheduleItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.MaintenanceScheduleItem = new SimpleSchema({
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
	end_date: {
		label: "End Date",
		type: Date,
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
	prevdoc_docname: {
		label: "Prevdoc Docname",
		type: String,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	no_of_visits: {
		label: "Number Of Visits",
		type: Number,
		optional: true
	},
	sales_person: {
		label: "Sales Person",
		type: String,
		optional: true
	},
	start_date: {
		label: "Start Date",
		type: Date,
		optional: true
	},
	periodicity: {
		label: "Periodicity",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	}
});

this.MaintenanceScheduleItem.attachSchema(this.Schemas.MaintenanceScheduleItem);
