Meteor.methods({

	removePurchaseInvoice: function(docIds) {
		PurchaseInvoice.remove({"_id":{"$in":docIds}});
	}

});
