this.Opportunity = new Mongo.Collection("opportunity");

this.Opportunity.userCanInsert = function(userId, doc) {
	return true;
}

this.Opportunity.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Opportunity.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Opportunity = new SimpleSchema({
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
		optional: true,
		defaultValue: "Open"
	},
	campaign: {
		label: "Campaign",
		type: String,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	enquiry_type: {
		label: "Enquiry Type",
		type: String,
		optional: true,
		defaultValue: "Sales"
	},
	enquiry_from: {
		label: "Enquiry From",
		type: String,
		optional: true
	},
	customer_name: {
		label: "Customer Name",
		type: String,
		optional: true
	},
	lead: {
		label: "Lead",
		type: String,
		optional: true
	},
	title: {
		label: "Title",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	contact_by: {
		label: "Contact By",
		type: String,
		optional: true
	},
	transaction_date: {
		label: "Transaction Date",
		type: Date,
		optional: true
	},
	contact_display: {
		label: "Contact Display",
		type: String,
		optional: true
	},
	territory: {
		label: "Territory",
		type: String,
		optional: true
	},
	address_display: {
		label: "Address Display",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	customer_address: {
		label: "Customer Address",
		type: String,
		optional: true
	},
	contact_email: {
		label: "Contact Email",
		type: String,
		optional: true
	},
	contact_mobile: {
		label: "Contact Mobile",
		type: String,
		optional: true
	},
	source: {
		label: "Source",
		type: String,
		optional: true
	},
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	order_lost_reason: {
		label: "Order Lost Reason",
		type: String,
		optional: true
	},
	contact_date: {
		label: "Contact Date",
		type: Date,
		optional: true
	},
	customer_group: {
		label: "Customer Group",
		type: String,
		optional: true
	},
	with_items: {
		label: "With Items",
		type: Number,
		defaultValue: 0
	},
	to_discuss: {
		label: "To Discuss",
		type: String,
		optional: true
	},
	contact_person: {
		label: "Contact Person",
		type: String,
		optional: true
	}
});

this.Opportunity.attachSchema(this.Schemas.Opportunity);
