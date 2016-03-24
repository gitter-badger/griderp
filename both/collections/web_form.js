this.WebForm = new Mongo.Collection("web_form");

this.WebForm.userCanInsert = function(userId, doc) {
	return true;
}

this.WebForm.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.WebForm.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.WebForm = new SimpleSchema({
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
	allow_edit: {
		label: "Allow Edit",
		type: Number,
		defaultValue: 0
	},
	doc_type: {
		label: "Doc Type",
		type: String,
		optional: true
	},
	allow_comments: {
		label: "Allow Comments",
		type: Number,
		defaultValue: 0
	},
	allow_multiple: {
		label: "Allow Multiple",
		type: Number,
		defaultValue: 0
	},
	title: {
		label: "Title",
		type: String,
		optional: true
	},
	breadcrumbs: {
		label: "Breadcrumbs",
		type: String,
		optional: true
	},
	login_required: {
		label: "Login Required",
		type: Number,
		defaultValue: 0
	},
	page_name: {
		label: "Page Name",
		type: String,
		optional: true
	},
	allow_delete: {
		label: "Allow Delete",
		type: Number,
		defaultValue: 0
	},
	success_url: {
		label: "Success URL",
		type: String,
		optional: true
	},
	success_message: {
		label: "Success Message",
		type: String,
		optional: true
	},
	published: {
		label: "Published",
		type: Number,
		defaultValue: 0
	},
	web_page_link_text: {
		label: "Web Page Link Text",
		type: String,
		optional: true
	},
	introduction_text: {
		label: "Introduction Text",
		type: String,
		optional: true
	}
});

this.WebForm.attachSchema(this.Schemas.WebForm);
