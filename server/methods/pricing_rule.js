Meteor.methods({

	removePricingRule: function(docIds) {
		PricingRule.remove({"_id":{"$in":docIds}});
	}

});
