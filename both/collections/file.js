this.File = new Mongo.Collection("file");

this.File.userCanInsert = function(userId, doc) {
	return true;
}

this.File.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.File.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.File = new SimpleSchema({
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
	file_name: {
		label: "File Name",
		type: String,
		optional: true
	},
	file_url: {
		label: "File URL",
		type: String,
		optional: true
	},
	module: {
		label: "Module",
		type: String,
		optional: true
	},
	attached_to_name: {
		label: "Attached To Name",
		type: String,
		optional: true
	},
	file_size: {
		label: "File Size",
		type: Number,
		optional: true
	},
	attached_to_doctype: {
		label: "Attached To Doctype",
		type: String,
		optional: true
	},
	rgt: {
		label: "Right",
		type: Number,
		optional: true
	},
	is_home_folder: {
		label: "Home Folder",
		type: Number,
		defaultValue: 0
	},
	old_parent: {
		label: "Old Parent",
		type: String,
		optional: true
	},
	lft: {
		label: "Left",
		type: Number,
		optional: true
	},
	is_attachments_folder: {
		label: "Attachments",
		type: Number,
		defaultValue: 0
	},
	is_folder: {
		label: "Folder",
		type: Number,
		defaultValue: 0
	},
	content_hash: {
		label: "Content Hash",
		type: String,
		optional: true
	},
	folder: {
		label: "Folder",
		type: String,
		optional: true
	}
});

this.File.attachSchema(this.Schemas.File);
