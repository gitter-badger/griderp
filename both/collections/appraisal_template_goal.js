this.AppraisalTemplateGoal = new Mongo.Collection("appraisal_template_goal");

this.AppraisalTemplateGoal.userCanInsert = function(userId, doc) {
	return true;
}

this.AppraisalTemplateGoal.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.AppraisalTemplateGoal.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.AppraisalTemplateGoal = new SimpleSchema({
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
	kra: {
		label: "KRA",
		type: String,
		optional: true
	},
	per_weightage: {
		label: "Per Weightage",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.AppraisalTemplateGoal.attachSchema(this.Schemas.AppraisalTemplateGoal);
