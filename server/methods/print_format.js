Meteor.methods({

	removePrintFormat: function(docIds) {
		PrintFormat.remove({"_id":{"$in":docIds}});
	}

});
