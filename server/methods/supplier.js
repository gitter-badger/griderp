Meteor.methods({

	removeSupplier: function(docIds) {
		Supplier.remove({"_id":{"$in":docIds}});
	}

});
