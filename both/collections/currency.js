this.Currency = new Mongo.Collection("currency");

this.Currency.userCanInsert = function(userId, doc) {
	return true;
}

this.Currency.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Currency.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Currency = new SimpleSchema({
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
	currency_name: {
		label: "Currency Name",
		type: String,
		optional: true
	},
	symbol: {
		label: "Symbol",
		type: String,
		optional: true
	},
	enabled: {
		label: "Enabled",
		type: Number,
		defaultValue: 0
	},
	fraction_units: {
		label: "Fraction Units",
		type: Number,
		optional: true
	},
	fraction: {
		label: "Fraction",
		type: String,
		optional: true
	},
	number_format: {
		label: "Number Format",
		type: String,
		optional: true
	}
});

this.Currency.attachSchema(this.Schemas.Currency);
