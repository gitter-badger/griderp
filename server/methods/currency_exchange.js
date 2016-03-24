Meteor.methods({

	removeCurrencyExchange: function(docIds) {
		CurrencyExchange.remove({"_id":{"$in":docIds}});
	}

});
