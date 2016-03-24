Meteor.methods({

	removeCustomer: function(docIds) {
		Customer.remove({"_id":{"$in":docIds}});
	}

});
