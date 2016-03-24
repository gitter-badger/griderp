Meteor.methods({

	removeAsyncTask: function(docIds) {
		AsyncTask.remove({"_id":{"$in":docIds}});
	}

});
