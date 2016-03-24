this.PaymentToolDetail = new Mongo.Collection("payment_tool_detail");

this.PaymentToolDetail.userCanInsert = function(userId, doc) {
	return true;
}

this.PaymentToolDetail.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PaymentToolDetail.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PaymentToolDetail = new SimpleSchema({
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
	total_amount: {
		label: "Total Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	against_voucher_type: {
		label: "Against Voucher Type",
		type: String,
		optional: true
	},
	outstanding_amount: {
		label: "Outstanding Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	payment_amount: {
		label: "Payment Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	against_voucher_no: {
		label: "Against Voucher Number",
		type: String,
		optional: true
	}
});

this.PaymentToolDetail.attachSchema(this.Schemas.PaymentToolDetail);
