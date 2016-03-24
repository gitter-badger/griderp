Meteor.methods({

	removeReport: function(docIds) {
		Report.remove({"_id":{"$in":docIds}});
	}

});
