this.WebsiteSlideshow = new Mongo.Collection("website_slideshow");

this.WebsiteSlideshow.userCanInsert = function(userId, doc) {
	return true;
}

this.WebsiteSlideshow.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.WebsiteSlideshow.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.WebsiteSlideshow = new SimpleSchema({
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
	slideshow_name: {
		label: "Slideshow Name",
		type: String,
		optional: true
	},
	header: {
		label: "Header",
		type: String,
		optional: true
	}
});

this.WebsiteSlideshow.attachSchema(this.Schemas.WebsiteSlideshow);
