Meteor.methods({

	removeFile: function(docIds) {
		File.remove({"_id":{"$in":docIds}});
	}

});
