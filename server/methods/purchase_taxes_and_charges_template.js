Meteor.methods({

	removePurchaseTaxesAndChargesTemplate: function(docIds) {
		PurchaseTaxesAndChargesTempate.remove({"_id":{"$in":docIds}});
	}

});
