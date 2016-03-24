this.BlogPost = new Mongo.Collection("blog_post");

this.BlogPost.userCanInsert = function(userId, doc) {
	return true;
}

this.BlogPost.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.BlogPost.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.BlogPost = new SimpleSchema({
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
	content: {
		label: "Content",
		type: String,
		optional: true
	},
	published_on: {
		label: "Published On",
		type: Date,
		optional: true
	},
	title: {
		label: "Title",
		type: String,
		optional: true
	},
	blogger: {
		label: "Blogger",
		type: String,
		optional: true
	},
	email_sent: {
		label: "Email Sent",
		type: Number,
		optional: true,
		defaultValue: 0
	},
	parent_website_route: {
		label: "Parent Website Route",
		type: String,
		optional: true
	},
	page_name: {
		label: "Page Name",
		type: String,
		optional: true
	},
	published: {
		label: "Published",
		type: Number,
		defaultValue: 0
	},
	blog_category: {
		label: "Blog Category",
		type: String,
		optional: true
	},
	blog_intro: {
		label: "Blog Intro",
		type: String,
		optional: true
	}
});

this.BlogPost.attachSchema(this.Schemas.BlogPost);
