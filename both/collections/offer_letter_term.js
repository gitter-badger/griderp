this.OfferLetterTerm = new Mongo.Collection("offer_letter_term");

this.OfferLetterTerm.userCanInsert = function(userId, doc) {
	return true;
}

this.OfferLetterTerm.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.OfferLetterTerm.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.OfferLetterTerm = new SimpleSchema({
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
	offer_term: {
		label: "Offer Term",
		type: String,
		optional: true
	},
	value: {
		label: "Value",
		type: String,
		optional: true
	}
});

this.OfferLetterTerm.attachSchema(this.Schemas.OfferLetterTerm);
