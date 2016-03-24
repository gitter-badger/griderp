this.SalesTeam = new Mongo.Collection("sales_team");

this.SalesTeam.userCanInsert = function(userId, doc) {
	return true;
}

this.SalesTeam.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalesTeam.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalesTeam = new SimpleSchema({
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
	allocated_percentage: {
		label: "Allocated Percentage",
		type: Number,
		decimal: true,
		optional: true
	},
	incentives: {
		label: "Incentives",
		type: Number,
		decimal: true,
		optional: true
	},
	sales_designation: {
		label: "Sales Designation",
		type: String,
		optional: true
	},
	contact_no: {
		label: "Contact Number",
		type: String,
		optional: true
	},
	allocated_amount: {
		label: "Allocated Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	sales_person: {
		label: "Sales Person",
		type: String,
		optional: true
	}
});

this.SalesTeam.attachSchema(this.Schemas.SalesTeam);
