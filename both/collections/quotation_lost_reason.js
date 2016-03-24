this.QuotationLostReason = new Mongo.Collection("quotation_lost_reason");

this.QuotationLostReason.userCanInsert = function(userId, doc) {
	return true;
}

this.QuotationLostReason.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.QuotationLostReason.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.QuotationLostReason = new SimpleSchema({
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
	order_lost_reason: {
		label: "Order Lost Reason",
		type: String,
		optional: true
	}
});

this.QuotationLostReason.attachSchema(this.Schemas.QuotationLostReason);
