this.UomConversionDetail = new Mongo.Collection("uom_conversion_detail");

this.UomConversionDetail.userCanInsert = function(userId, doc) {
	return true;
}

this.UomConversionDetail.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.UomConversionDetail.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.UomConversionDetail = new SimpleSchema({
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
	conversion_factor: {
		label: "Conversion Factor",
		type: Number,
		decimal: true,
		optional: true
	},
	uom: {
		label: "UOM",
		type: String,
		optional: true
	}
});

this.UomConversionDetail.attachSchema(this.Schemas.UomConversionDetail);
