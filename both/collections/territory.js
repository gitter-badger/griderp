this.Territory = new Mongo.Collection("territory");

this.Territory.userCanInsert = function(userId, doc) {
	return true;
}

this.Territory.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Territory.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Territory = new SimpleSchema({
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
	old_parent: {
		label: "Old Parent",
		type: String,
		optional: true
	},
	rgt: {
		label: "Right",
		type: Number,
		optional: true
	},
	lft: {
		label: "Left",
		type: Number,
		optional: true
	},
	is_group: {
		label: "Is Group",
		type: String,
		optional: true
	},
	territory_name: {
		label: "Territory Name",
		type: String,
		optional: true
	},
	distribution_id: {
		label: "Distribution Id",
		type: String,
		optional: true
	},
	parent_territory: {
		label: "Parent Territory",
		type: String,
		optional: true
	},
	territory_manager: {
		label: "Territory Manager",
		type: String,
		optional: true
	}
});

this.Territory.attachSchema(this.Schemas.Territory);
