this.MaterialRequest = new Mongo.Collection("material_request");

this.MaterialRequest.userCanInsert = function(userId, doc) {
	return true;
}

this.MaterialRequest.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.MaterialRequest.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.MaterialRequest = new SimpleSchema({
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
	per_ordered: {
		label: "Per Ordered",
		type: Number,
		decimal: true,
		optional: true
	},
	select_print_heading: {
		label: "Select Print Heading",
		type: String,
		optional: true
	},
	terms: {
		label: "Terms",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	material_request_type: {
		label: "Material Request Type",
		type: String,
		optional: true
	},
	tc_name: {
		label: "TC Name",
		type: String,
		optional: true
	},
	letter_head: {
		label: "Letter Head",
		type: String,
		optional: true
	},
	transaction_date: {
		label: "Transaction Date",
		type: Date,
		optional: true
	},
	requested_by: {
		label: "Requested By",
		type: String,
		optional: true
	}
});

this.MaterialRequest.attachSchema(this.Schemas.MaterialRequest);
