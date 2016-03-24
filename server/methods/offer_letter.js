Meteor.methods({

	removeOfferLetter: function(docIds) {
		OfferLetter.remove({"_id":{"$in":docIds}});
	}

});
