this.Campaign = new Mongo.Collection("campaign");

this.Campaign.userCanInsert = function(userId, doc) {
	return true;
}

this.Campaign.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Campaign.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Campaign = new SimpleSchema({
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
	campaign_name: {
		label: "Campaign Name",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	}
});

this.Campaign.attachSchema(this.Schemas.Campaign);
