Meteor.publish("address_list", function(limit) {
	var defaultLimit = limit || 25;
	return Address.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("address_empty", function() {
	return Address.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("address_details", function(addressId) {
	return Address.find({ _id: addressId, ownerId: this.userId }, {});
});
