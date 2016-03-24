this.Lead = new Mongo.Collection("lead");

this.Lead.userCanInsert = function(userId, doc) {
	return true;
}

this.Lead.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Lead.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Lead = new SimpleSchema({
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
	website: {
		label: "Website",
		type: String,
		optional: true
	},
	email_id: {
		label: "Email Id",
		type: String,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	mobile_no: {
		label: "Mobile Number",
		type: String,
		optional: true
	},
	campaign_name: {
		label: "Campaign Name",
		type: String,
		optional: true
	},
	lead_name: {
		label: "Lead Name",
		type: String,
		optional: true
	},
	type: {
		label: "Type",
		type: String,
		optional: true
	},
	source: {
		label: "Source",
		type: String,
		optional: true
	},
	contact_by: {
		label: "Contact By",
		type: String,
		optional: true
	},
	company_name: {
		label: "Company Name",
		type: String,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	territory: {
		label: "Territory",
		type: String,
		optional: true
	},
	unsubscribed: {
		label: "Unsubscribed",
		type: Number,
		defaultValue: 0
	},
	status: {
		label: "Status",
		type: String,
		optional: true,
		defaultValue: "Lead"
	},
	fax: {
		label: "Fax",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	market_segment: {
		label: "Market Segment",
		type: String,
		optional: true
	},
	lead_owner: {
		label: "Lead Owner",
		type: String,
		optional: true
	},
	phone: {
		label: "Phone",
		type: String,
		optional: true
	},
	request_type: {
		label: "Request Type",
		type: String,
		optional: true
	},
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	blog_subscriber: {
		label: "Blog Subscriber",
		type: Number,
		defaultValue: 0
	},
	industry: {
		label: "Industry",
		type: String,
		optional: true
	},
	contact_date: {
		label: "Contact Date",
		type: Date,
		optional: true
	}
});

this.Lead.attachSchema(this.Schemas.Lead);
