Meteor.methods({

	removePurchaseReceipt: function(docIds) {
		PurchaseReceipt.remove({"_id":{"$in":docIds}});
	}

});
