Meteor.publish("brand_list", function(limit) {
	var defaultLimit = limit || 25;
	return Brand.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("brand_empty", function() {
	return Brand.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("brand_details", function(brandId) {
	return Brand.find({ _id: brandId, ownerId: this.userId }, {});
});
