this.SupplierType = new Mongo.Collection("supplier_type");

this.SupplierType.userCanInsert = function(userId, doc) {
	return true;
}

this.SupplierType.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SupplierType.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SupplierType = new SimpleSchema({
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
	credit_days: {
		label: "Credit Days",
		type: Number,
		optional: true
	},
	supplier_type: {
		label: "Supplier Type",
		type: String,
		optional: true
	}
});

this.SupplierType.attachSchema(this.Schemas.SupplierType);
