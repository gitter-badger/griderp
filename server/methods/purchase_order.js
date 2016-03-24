Meteor.methods({

	removePurchaseOrder: function(docIds) {
		PurchaseOrder.remove({"_id":{"$in":docIds}});
	}

});
