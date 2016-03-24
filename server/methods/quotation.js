Meteor.methods({

	removeQuotation: function(docIds) {
		Quotation.remove({"_id":{"$in":docIds}});
	}

});
