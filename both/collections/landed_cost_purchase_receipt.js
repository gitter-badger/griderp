this.LandedCostPurchaseReceipt = new Mongo.Collection("landed_cost_purchase_receipt");

this.LandedCostPurchaseReceipt.userCanInsert = function(userId, doc) {
	return true;
}

this.LandedCostPurchaseReceipt.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.LandedCostPurchaseReceipt.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.LandedCostPurchaseReceipt = new SimpleSchema({
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
	purchase_receipt: {
		label: "Purchase Receipt",
		type: String,
		optional: true
	},
	grand_total: {
		label: "Grand Total",
		type: Number,
		decimal: true,
		optional: true
	},
	supplier: {
		label: "Supplier",
		type: String,
		optional: true
	},
	posting_date: {
		label: "Posting Date",
		type: Date,
		optional: true
	}
});

this.LandedCostPurchaseReceipt.attachSchema(this.Schemas.LandedCostPurchaseReceipt);
