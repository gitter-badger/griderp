Meteor.methods({

	removeTaxRule: function(docIds) {
		TaxRule.remove({"_id":{"$in":docIds}});
	}

});
