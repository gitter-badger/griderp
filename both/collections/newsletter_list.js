this.NewsletterList = new Mongo.Collection("newsletter_list");

this.NewsletterList.userCanInsert = function(userId, doc) {
	return true;
}

this.NewsletterList.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.NewsletterList.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.NewsletterList = new SimpleSchema({
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
	total_subscribers: {
		label: "Total Subscribers",
		type: Number,
		optional: true,
		defaultValue: 0
	},
	title: {
		label: "Title",
		type: String,
		optional: true
	}
});

this.NewsletterList.attachSchema(this.Schemas.NewsletterList);
