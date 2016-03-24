this.ModeOfPayment = new Mongo.Collection("mode_of_payment");

this.ModeOfPayment.userCanInsert = function(userId, doc) {
	return true;
}

this.ModeOfPayment.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ModeOfPayment.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ModeOfPayment = new SimpleSchema({
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
	mode_of_payment: {
		label: "Mode Of Payment",
		type: String,
		optional: true
	}
});

this.ModeOfPayment.attachSchema(this.Schemas.ModeOfPayment);
