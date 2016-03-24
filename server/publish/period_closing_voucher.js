Meteor.publish("period_closing_voucher_list", function(limit) {
	var defaultLimit = limit || 25;
	return PeriodClosingVoucher.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("period_closing_voucher_empty", function() {
	return PeriodClosingVoucher.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("period_closing_voucher_details", function(periodClosingVoucherId) {
	return PeriodClosingVoucher.find({ _id: periodClosingVoucherId, ownerId: this.userId }, {});
});
