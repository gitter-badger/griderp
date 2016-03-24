Meteor.methods({

	removePackingSlip: function(docIds) {
		PackingSlip.remove({"_id":{"$in":docIds}});
	}

});
