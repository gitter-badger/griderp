this.OpportunityItem = new Mongo.Collection("opportunity_item");

this.OpportunityItem.userCanInsert = function(userId, doc) {
	return true;
}

this.OpportunityItem.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.OpportunityItem.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.OpportunityItem = new SimpleSchema({
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
	basic_rate: {
		label: "Basic Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	item_name: {
		label: "Item Name",
		type: String,
		optional: true
	},
	brand: {
		label: "Brand",
		type: String,
		optional: true
	},
	item_group: {
		label: "Item Group",
		type: String,
		optional: true
	},
	item_code: {
		label: "Item Code",
		type: String,
		optional: true
	},
	qty: {
		label: "Quantity",
		type: Number,
		decimal: true,
		optional: true
	},
	image: {
		label: "Image",
		type: String,
		optional: true
	},
	uom: {
		label: "UOM",
		type: String,
		optional: true
	}
});

this.OpportunityItem.attachSchema(this.Schemas.OpportunityItem);
