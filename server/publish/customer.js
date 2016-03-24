Meteor.publish("customer_list", function(limit) {
	var defaultLimit = limit || 25;
	return Customer.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("customer_empty", function() {
	return Customer.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("customer_details", function(customerId) {
	return Customer.find({ _id: customerId, ownerId: this.userId }, {});
});
