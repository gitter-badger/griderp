this.PackingSlip = new Mongo.Collection("packing_slip");

this.PackingSlip.userCanInsert = function(userId, doc) {
	return true;
}

this.PackingSlip.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PackingSlip.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PackingSlip = new SimpleSchema({
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
	net_weight_uom: {
		label: "Net Weight UOM",
		type: String,
		optional: true
	},
	from_case_no: {
		label: "From Case Number",
		type: String,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	gross_weight_uom: {
		label: "Gross Weight UOM",
		type: String,
		optional: true
	},
	letter_head: {
		label: "Letter Head",
		type: String,
		optional: true
	},
	to_case_no: {
		label: "To Case Number",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	net_weight_pkg: {
		label: "Net Weight Package",
		type: Number,
		decimal: true,
		optional: true
	},
	gross_weight_pkg: {
		label: "Gross Weight Package",
		type: Number,
		decimal: true,
		optional: true
	},
	delivery_note: {
		label: "Delivery Note",
		type: String,
		optional: true
	}
});

this.PackingSlip.attachSchema(this.Schemas.PackingSlip);
