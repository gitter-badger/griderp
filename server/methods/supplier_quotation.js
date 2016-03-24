Meteor.methods({

	removeSupplierQuotation: function(docIds) {
		SupplierQuotation.remove({"_id":{"$in":docIds}});
	}

});
