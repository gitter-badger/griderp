Meteor.methods({

	removePriceList: function(docIds) {
		PriceList.remove({"_id":{"$in":docIds}});
	}

});
