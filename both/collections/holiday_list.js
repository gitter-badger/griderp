this.HolidayList = new Mongo.Collection("holiday_list");

this.HolidayList.userCanInsert = function(userId, doc) {
	return true;
}

this.HolidayList.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.HolidayList.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.HolidayList = new SimpleSchema({
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
	holiday_list_name: {
		label: "Holiday List Name",
		type: String,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	is_default: {
		label: "Is Default",
		type: Number,
		defaultValue: 0
	},
	weekly_off: {
		label: "Weekly Off",
		type: String,
		optional: true
	}
});

this.HolidayList.attachSchema(this.Schemas.HolidayList);
