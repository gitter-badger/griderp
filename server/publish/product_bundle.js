Meteor.publish("product_bundle_list", function(limit) {
	var defaultLimit = limit || 25;
	return ProductBundle.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("product_bundle_empty", function() {
	return ProductBundle.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("product_bundle_details", function(productBundleId) {
	return ProductBundle.find({ _id: productBundleId, ownerId: this.userId }, {});
});
