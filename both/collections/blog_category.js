this.BlogCategory = new Mongo.Collection("blog_category");

this.BlogCategory.userCanInsert = function(userId, doc) {
	return true;
}

this.BlogCategory.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.BlogCategory.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.BlogCategory = new SimpleSchema({
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
	parent_website_route: {
		label: "Parent Website Route",
		type: String,
		optional: true,
		defaultValue: "blog"
	},
	category_name: {
		label: "Category Name",
		type: String,
		optional: true
	},
	title: {
		label: "Title",
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
	}
});

this.BlogCategory.attachSchema(this.Schemas.BlogCategory);
