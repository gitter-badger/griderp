Meteor.methods({

	removePrintHeading: function(docIds) {
		PrintHeading.remove({"_id":{"$in":docIds}});
	}

});
