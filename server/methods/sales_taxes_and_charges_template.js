Meteor.methods({

	removeSalesTaxesAndChargesTemplate: function(docIds) {
		SalesTaxesAndChargesTemplate.remove({"_id":{"$in":docIds}});
	}

});
