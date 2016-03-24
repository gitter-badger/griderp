Meteor.methods({

	removeSupplierType: function(docIds) {
		SupplierType.remove({"_id":{"$in":docIds}});
	}

});
