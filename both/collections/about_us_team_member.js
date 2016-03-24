this.AboutUsTeamMember = new Mongo.Collection("about_us_team_member");

this.AboutUsTeamMember.userCanInsert = function(userId, doc) {
	return true;
}

this.AboutUsTeamMember.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.AboutUsTeamMember.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.AboutUsTeamMember = new SimpleSchema({
	name: {
		label: "Name",
		type: String
	},
	docstatus: {
		label: "Document Status",
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
	image_link: {
		label: "Image Link",
		type: String,
		optional: true
	},
	bio: {
		label: "Bio",
		type: String,
		optional: true
	},
	full_name: {
		label: "Full Name",
		type: String,
		optional: true
	}
});

this.AboutUsTeamMember.attachSchema(this.Schemas.AboutUsTeamMember);
