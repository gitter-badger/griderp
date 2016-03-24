this.EmployeeEducation = new Mongo.Collection("employee_education");

this.EmployeeEducation.userCanInsert = function(userId, doc) {
	return true;
}

this.EmployeeEducation.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.EmployeeEducation.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.EmployeeEducation = new SimpleSchema({
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
	maj_opt_subj: {
		label: "Major Subject",
		type: String,
		optional: true
	},
	level: {
		label: "Level",
		type: String,
		optional: true
	},
	class_per: {
		label: "Class Per",
		type: String,
		optional: true
	},
	qualification: {
		label: "Qualification",
		type: String,
		optional: true
	},
	school_univ: {
		label: "School University",
		type: String,
		optional: true
	},
	year_of_passing: {
		label: "Year Of Passing",
		type: Number,
		optional: true
	}
});

this.EmployeeEducation.attachSchema(this.Schemas.EmployeeEducation);
