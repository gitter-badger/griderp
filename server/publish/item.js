Meteor.publish("item_list", function(limit) {
	var defaultLimit = limit || 25;
	return Item.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("item_empty", function() {
	return Item.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("item_details", function(itemId) {
	return Item.find({ _id: itemId, ownerId: this.userId }, {});
});
