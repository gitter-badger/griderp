this.MaintenanceScheduleDetail = new Mongo.Collection("maintenance_schedule_detail");

this.MaintenanceScheduleDetail.userCanInsert = function(userId, doc) {
	return true;
}

this.MaintenanceScheduleDetail.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.MaintenanceScheduleDetail.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.MaintenanceScheduleDetail = new SimpleSchema({
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
	scheduled_date: {
		label: "Scheduled Date",
		type: Date,
		optional: true
	},
	sales_person: {
		label: "Sales Person",
		type: String,
		optional: true
	},
	actual_date: {
		label: "Actual Date",
		type: Date,
		optional: true
	}
});

this.MaintenanceScheduleDetail.attachSchema(this.Schemas.MaintenanceScheduleDetail);
