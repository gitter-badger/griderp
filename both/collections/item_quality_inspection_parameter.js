this.ItemQualityInspectionParameter = new Mongo.Collection("item_quality_inspection_parameter");

this.ItemQualityInspectionParameter.userCanInsert = function(userId, doc) {
	return true;
}

this.ItemQualityInspectionParameter.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ItemQualityInspectionParameter.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ItemQualityInspectionParameter = new SimpleSchema({
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
	specification: {
		label: "Specification",
		type: String,
		optional: true
	},
	value: {
		label: "Value",
		type: String,
		optional: true
	}
});

this.ItemQualityInspectionParameter.attachSchema(this.Schemas.ItemQualityInspectionParameter);
