Meteor.methods({

	removeNote: function(docIds) {
		Note.remove({"_id":{"$in":docIds}});
	}

});
