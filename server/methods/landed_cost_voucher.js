Meteor.methods({

	removeLandedCostVoucher: function(docIds) {
		LandedCostVoucher.remove({"_id":{"$in":docIds}});
	}

});
