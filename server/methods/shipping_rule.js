Meteor.methods({

	removeShippingRule: function(docIds) {
		ShippingRule.remove({"_id":{"$in":docIds}});
	}

});
