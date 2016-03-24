Meteor.methods({

	removeStockEntry: function(docIds) {
		StockEntry.remove({"_id":{"$in":docIds}});
	}

});
