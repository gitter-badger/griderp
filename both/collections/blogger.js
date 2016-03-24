this.Blogger = new Mongo.Collection("blogger");

this.Blogger.userCanInsert = function(userId, doc) {
	return true;
}

this.Blogger.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Blogger.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Blogger = new SimpleSchema({
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
	bio: {
		label: "Bio",
		type: String,
		optional: true
	},
	short_name: {
		label: "Short Name",
		type: String,
		optional: true
	},
	posts: {
		label: "Posts",
		type: Number,
		optional: true
	},
	disabled: {
		label: "Disabled",
		type: Number,
		defaultValue: 0
	},
	avatar: {
		label: "Avatar",
		type: String,
		optional: true
	},
	full_name: {
		label: "Full Name",
		type: String,
		optional: true
	},
	user: {
		label: "User",
		type: String,
		optional: true
	}
});

this.Blogger.attachSchema(this.Schemas.Blogger);
