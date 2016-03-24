this.SalesPartner = new Mongo.Collection("sales_partner");

this.SalesPartner.userCanInsert = function(userId, doc) {
	return true;
}

this.SalesPartner.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalesPartner.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalesPartner = new SimpleSchema({
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
	partner_website: {
		label: "Partner Website",
		type: String,
		optional: true
	},
	logo: {
		label: "Logo",
		type: String,
		optional: true
	},
	commission_rate: {
		label: "Commission Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	introduction: {
		label: "Introduction",
		type: String,
		optional: true
	},
	distribution_id: {
		label: "Distribution Id",
		type: String,
		optional: true
	},
	page_name: {
		label: "Page Name",
		type: String,
		optional: true
	},
	territory: {
		label: "Territory",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	partner_type: {
		label: "Partner Type",
		type: String,
		optional: true
	},
	show_in_website: {
		label: "Show In Website",
		type: Number,
		defaultValue: 0
	},
	parent_website_route: {
		label: "Parent Website Route",
		type: String,
		optional: true,
		defaultValue: "partners"
	},
	partner_name: {
		label: "Partner Name",
		type: String,
		optional: true
	}
});

this.SalesPartner.attachSchema(this.Schemas.SalesPartner);
