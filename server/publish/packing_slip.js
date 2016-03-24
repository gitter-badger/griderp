Meteor.publish("packing_slip_list", function(limit) {
	var defaultLimit = limit || 25;
	return PackingSlip.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("packing_slip_empty", function() {
	return PackingSlip.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("packing_slip_details", function(packingSlipId) {
	return PackingSlip.find({ _id: packingSlipId, ownerId: this.userId }, {});
});
