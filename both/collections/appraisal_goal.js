this.AppraisalGoal = new Mongo.Collection("appraisal_goal");

this.AppraisalGoal.userCanInsert = function(userId, doc) {
	return true;
}

this.AppraisalGoal.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.AppraisalGoal.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.AppraisalGoal = new SimpleSchema({
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
	score_earned: {
		label: "Score Earned",
		type: Number,
		decimal: true,
		optional: true
	},
	score: {
		label: "Score",
		type: Number,
		decimal: true,
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

this.AppraisalGoal.attachSchema(this.Schemas.AppraisalGoal);
