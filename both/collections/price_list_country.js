this.PriceListCountry = new Mongo.Collection("price_list_country");

this.PriceListCountry.userCanInsert = function(userId, doc) {
	return true;
}

this.PriceListCountry.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PriceListCountry.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PriceListCountry = new SimpleSchema({
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
	country: {
		label: "Country",
		type: String,
		optional: true
	}
});

this.PriceListCountry.attachSchema(this.Schemas.PriceListCountry);
