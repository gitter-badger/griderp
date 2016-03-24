this.CurrencyExchange = new Mongo.Collection("currency_exchange");

this.CurrencyExchange.userCanInsert = function(userId, doc) {
	return true;
}

this.CurrencyExchange.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.CurrencyExchange.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.CurrencyExchange = new SimpleSchema({
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
	to_currency: {
		label: "To Currency",
		type: String,
		optional: true
	},
	exchange_rate: {
		label: "Exchange Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	from_currency: {
		label: "From Currency",
		type: String,
		optional: true
	}
});

this.CurrencyExchange.attachSchema(this.Schemas.CurrencyExchange);
