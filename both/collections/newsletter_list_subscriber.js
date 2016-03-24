this.NewsletterListSubscriber = new Mongo.Collection("newsletter_list_subscriber");

this.NewsletterListSubscriber.userCanInsert = function(userId, doc) {
	return true;
}

this.NewsletterListSubscriber.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.NewsletterListSubscriber.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.NewsletterListSubscriber = new SimpleSchema({
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
	newsletter_list: {
		label: "Newsletter List",
		type: String,
		optional: true
	},
	email: {
		label: "Email",
		type: String,
		optional: true
	},
	unsubscribed: {
		label: "Unsubscribed",
		type: Number,
		defaultValue: 0
	}
});

this.NewsletterListSubscriber.attachSchema(this.Schemas.NewsletterListSubscriber);
