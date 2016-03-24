this.Bom = new Mongo.Collection("bom");

this.Bom.userCanInsert = function(userId, doc) {
	return true;
}

this.Bom.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Bom.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Bom = new SimpleSchema({
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
	operating_cost: {
		label: "Operating Cost",
		type: Number,
		decimal: true,
		optional: true
	},
	image: {
		label: "Image",
		type: String,
		optional: true
	},
	total_cost: {
		label: "Total Cost",
		type: Number,
		decimal: true,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	buying_price_list: {
		label: "Buying Price List",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	uom: {
		label: "UOM",
		type: String,
		optional: true
	},
	project_name: {
		label: "Project Name",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	with_operations: {
		label: "With Operations",
		type: Number,
		defaultValue: 0
	},
	raw_material_cost: {
		label: "Raw Material Cost",
		type: Number,
		decimal: true,
		optional: true
	},
	is_active: {
		label: "Is Active",
		type: Number,
		defaultValue: 1
	},
	is_default: {
		label: "Is Default",
		type: Number,
		defaultValue: 1
	},
	rm_cost_as_per: {
		label: "RM Cost as Per",
		type: String,
		optional: true
	},
	item: {
		label: "Item",
		type: String,
		optional: true
	},
	item_name: {
		label: "Item Name",
		type: String,
		optional: true
	},
	quantity: {
		label: "Quantity",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 1
	}
});

this.Bom.attachSchema(this.Schemas.Bom);
