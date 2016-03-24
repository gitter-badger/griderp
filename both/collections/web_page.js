this.WebPage = new Mongo.Collection("web_page");

this.WebPage.userCanInsert = function(userId, doc) {
	return true;
}

this.WebPage.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.WebPage.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.WebPage = new SimpleSchema({
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
	text_align: {
		label: "Text Align",
		type: String,
		optional: true
	},
	parent_website_route: {
		label: "Parent Website Route",
		type: String,
		optional: true
	},
	header: {
		label: "Header",
		type: String,
		optional: true
	},
	title: {
		label: "Title",
		type: String,
		optional: true
	},
	insert_style: {
		label: "Insert Style",
		type: Number,
		defaultValue: 0
	},
	page_name: {
		label: "Page Name",
		type: String,
		optional: true
	},
	enable_comments: {
		label: "Enable Comments",
		type: Number,
		defaultValue: 0
	},
	parent_web_page: {
		label: "Parent Web Page",
		type: String,
		optional: true
	},
	css: {
		label: "CSS",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	insert_code: {
		label: "Insert Code",
		type: Number,
		defaultValue: 0
	},
	javascript: {
		label: "Javascript",
		type: String,
		optional: true
	},
	slideshow: {
		label: "Slideshow",
		type: String,
		optional: true
	},
	show_title: {
		label: "Show Title",
		type: Number,
		defaultValue: 1
	},
	main_section: {
		label: "Main Section",
		type: String,
		optional: true
	},
	template_path: {
		label: "Template Path",
		type: String,
		optional: true
	},
	published: {
		label: "Published",
		type: Number,
		defaultValue: 0
	}
});

this.WebPage.attachSchema(this.Schemas.WebPage);
