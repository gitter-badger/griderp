Meteor.methods({

	removeSalesPartner: function(docIds) {
		SalesPartner.remove({"_id":{"$in":docIds}});
	}

});
