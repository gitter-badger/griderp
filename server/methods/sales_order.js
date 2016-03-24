Meteor.methods({

	removeSalesOrder: function(docIds) {
		SalesOrder.remove({"_id":{"$in":docIds}});
	}

});
