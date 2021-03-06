this.Country = new Mongo.Collection("country");

this.Country.userCanInsert = function(userId, doc) {
	return true;
}

this.Country.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Country.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Country = new SimpleSchema({
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
	country_name: {
		label: "Country Name",
		type: String,
		optional: true
	},
	date_format: {
		label: "Date Format",
		type: String,
		optional: true
	},
	code: {
		label: "Code",
		type: String,
		optional: true
	},
	time_zones: {
		label: "Time Zones",
		type: String,
		optional: true
	}
});

this.Country.attachSchema(this.Schemas.Country);
