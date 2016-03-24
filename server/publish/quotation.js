Meteor.publish("quotation_list", function(limit) {
	var defaultLimit = limit || 25;
	return Quotation.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("quotation_empty", function() {
	return Quotation.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("quotation_details", function(quotationId) {
	return Quotation.find({ _id: quotationId, ownerId: this.userId }, {});
});
