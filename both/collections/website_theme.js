this.WebsiteTheme = new Mongo.Collection("website_theme");

this.WebsiteTheme.userCanInsert = function(userId, doc) {
	return true;
}

this.WebsiteTheme.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.WebsiteTheme.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.WebsiteTheme = new SimpleSchema({
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
	heading_style: {
		label: "Heading Style",
		type: String,
		optional: true
	},
	link_color: {
		label: "Link Color",
		type: String,
		optional: true
	},
	module: {
		label: "Module",
		type: String,
		optional: true,
		defaultValue: "Website"
	},
	footer_text_color: {
		label: "Footer Text Color",
		type: String,
		optional: true
	},
	heading_webfont: {
		label: "Heading Webfont",
		type: String,
		optional: true
	},
	background_color: {
		label: "Background Color",
		type: String,
		optional: true
	},
	apply_style: {
		label: "Apply Style",
		type: Number,
		defaultValue: 1
	},
	background_image: {
		label: "Background Image",
		type: String,
		optional: true
	},
	top_bar_text_color: {
		label: "Top Bar Text Color",
		type: String,
		optional: true
	},
	custom: {
		label: "Custom",
		type: Number,
		defaultValue: 1
	},
	theme: {
		label: "Theme",
		type: String,
		optional: true
	},
	footer_color: {
		label: "Footer Color",
		type: String,
		optional: true
	},
	css: {
		label: "CSS",
		type: String,
		optional: true
	},
	text_webfont: {
		label: "Text Webfont",
		type: String,
		optional: true
	},
	text_color: {
		label: "Text Color",
		type: String,
		optional: true
	},
	js: {
		label: "JS",
		type: String,
		optional: true
	},
	font_size: {
		label: "Font Size",
		type: String,
		optional: true
	},
	no_sidebar: {
		label: "No Sidebar",
		type: Number,
		defaultValue: 0
	},
	top_bar_color: {
		label: "Top Bar Color",
		type: String,
		optional: true
	},
	bootstrap: {
		label: "Bootstrap",
		type: String,
		optional: true
	}
});

this.WebsiteTheme.attachSchema(this.Schemas.WebsiteTheme);
