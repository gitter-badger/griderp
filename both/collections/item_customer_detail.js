this.ItemCustomerDetail = new Mongo.Collection("item_customer_detail");

this.ItemCustomerDetail.userCanInsert = function(userId, doc) {
	return true;
}

this.ItemCustomerDetail.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ItemCustomerDetail.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ItemCustomerDetail = new SimpleSchema({
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
	ref_code: {
		label: "Reference Code",
		type: String,
		optional: true
	},
	customer_name: {
		label: "Customer Name",
		type: String,
		optional: true
	}
});

this.ItemCustomerDetail.attachSchema(this.Schemas.ItemCustomerDetail);
