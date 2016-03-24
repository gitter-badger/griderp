Meteor.publish("item_attribute_list", function(limit) {
	var defaultLimit = limit || 25;
	return ItemAttribute.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("item_attribute_empty", function() {
	return ItemAttribute.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("item_attribute_details", function(itemAttributeId) {
	return ItemAttribute.find({ _id: itemAttributeId, ownerId: this.userId }, {});
});
