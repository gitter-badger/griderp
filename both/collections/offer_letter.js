this.OfferLetter = new Mongo.Collection("offer_letter");

this.OfferLetter.userCanInsert = function(userId, doc) {
	return true;
}

this.OfferLetter.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.OfferLetter.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.OfferLetter = new SimpleSchema({
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
		optional: true
	},
	job_applicant: {
		label: "Job Applicant",
		type: String,
		optional: true
	},
	terms: {
		label: "Terms",
		type: String,
		optional: true
	},
	designation: {
		label: "Designation",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	select_terms: {
		label: "Select Terms",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	applicant_name: {
		label: "Applicant Name",
		type: String,
		optional: true
	},
	offer_date: {
		label: "Offer Date",
		type: Date,
		optional: true
	}
});

this.OfferLetter.attachSchema(this.Schemas.OfferLetter);
