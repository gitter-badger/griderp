this.Appraisal = new Mongo.Collection("appraisal");

this.Appraisal.userCanInsert = function(userId, doc) {
	return true;
}

this.Appraisal.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Appraisal.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Appraisal = new SimpleSchema({
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
		defaultValue: "Draft"
	},
	kra_template: {
		label: "KRA Template",
		type: String,
		optional: true
	},
	end_date: {
		label: "End Date",
		type: Date,
		optional: true
	},
	total_score: {
		label: "Total Score",
		type: Number,
		decimal: true,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended Form",
		type: String,
		optional: true
	},
	remarks: {
		label: "Renarks",
		type: String,
		optional: true
	},
	employee_name: {
		label: "Employee Name",
		type: String,
		optional: true
	},
	employee: {
		label: "Employee",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	start_date: {
		label: "Start Date",
		type: Date,
		optional: true
	}
});

this.Appraisal.attachSchema(this.Schemas.Appraisal);
