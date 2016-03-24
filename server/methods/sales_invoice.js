Meteor.methods({

	removeSalesInvoice: function(docIds) {
		SalesInvoice.remove({"_id":{"$in":docIds}});
	}

});
