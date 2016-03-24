Meteor.methods({

	removePeriodClosingVoucher: function(docIds) {
		PeriodClosingVoucher.remove({"_id":{"$in":docIds}});
	}

});
