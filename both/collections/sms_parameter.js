this.SmsParameter = new Mongo.Collection("sms_parameter");

this.SmsParameter.userCanInsert = function(userId, doc) {
	return true;
}

this.SmsParameter.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SmsParameter.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SmsParameter = new SimpleSchema({
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
	parameter: {
		label: "Parameter",
		type: String,
		optional: true
	},
	value: {
		label: "Value",
		type: String,
		optional: true
	}
});

this.SmsParameter.attachSchema(this.Schemas.SmsParameter);
