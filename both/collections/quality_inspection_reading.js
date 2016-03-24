this.QualityInspectionReading = new Mongo.Collection("quality_inspection_reading");

this.QualityInspectionReading.userCanInsert = function(userId, doc) {
	return true;
}

this.QualityInspectionReading.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.QualityInspectionReading.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.QualityInspectionReading = new SimpleSchema({
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
	status: {
		label: "Status",
		type: String,
		optional: true,
		defaultValue: "Accepted"
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
	},
	reading_10: {
		label: "Reading 10",
		type: String,
		optional: true
	},
	reading_8: {
		label: "Reading 8",
		type: String,
		optional: true
	},
	reading_9: {
		label: "Reading 9",
		type: String,
		optional: true
	},
	reading_1: {
		label: "Reading 1",
		type: String,
		optional: true
	},
	reading_2: {
		label: "Reading 2",
		type: String,
		optional: true
	},
	reading_3: {
		label: "Reading 3",
		type: String,
		optional: true
	},
	reading_4: {
		label: "Reading 4",
		type: String,
		optional: true
	},
	reading_5: {
		label: "Reading 5",
		type: String,
		optional: true
	},
	reading_6: {
		label: "Reading 6",
		type: String,
		optional: true
	},
	reading_7: {
		label: "Reading 7",
		type: String,
		optional: true
	}
});

this.QualityInspectionReading.attachSchema(this.Schemas.QualityInspectionReading);
