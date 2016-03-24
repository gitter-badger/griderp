Meteor.publish("mode_of_payment_list", function(limit) {
	var defaultLimit = limit || 25;
	return ModeOfPayment.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("mode_of_payment_empty", function() {
	return ModeOfPayment.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("mode_of_payment_details", function(modeOfPaymentId) {
	return ModeOfPayment.find({ _id: modeOfPaymentId, ownerId: this.userId }, {});
});
