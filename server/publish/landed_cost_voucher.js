Meteor.publish("landed_cost_voucher_list", function(limit) {
	var defaultLimit = limit || 25;
	return LandedCostVoucher.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("landed_cost_voucher_empty", function() {
	return LandedCostVoucher.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("landed_cost_voucher_details", function(landedCostVoucherId) {
	return LandedCostVoucher.find({ _id: landedCostVoucherId, ownerId: this.userId }, {});
});
