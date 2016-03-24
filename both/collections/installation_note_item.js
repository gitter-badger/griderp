this.InstallationNoteItem = new Mongo.Collection("installation_note_item");

this.InstallationNoteItem.userCanInsert = function(userId, doc) {
	return true;
}

this.InstallationNoteItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.InstallationNoteItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.InstallationNoteItem = new SimpleSchema({
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
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	prevdoc_docname: {
		label: "Prevdoc Docname",
		type: String,
		optional: true
	},
	serial_no: {
		label: "Serial Number",
		type: String,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	qty: {
		label: "Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	prevdoc_detail_docname: {
		label: "Prevdoc Detail Docname",
		type: String,
		optional: true
	},
	prevdoc_doctype: {
		label: "Prevdoc Doctype",
		type: String,
		optional: true
	}
});

this.InstallationNoteItem.attachSchema(this.Schemas.InstallationNoteItem);
