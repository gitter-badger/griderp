Meteor.methods({

	removeWebForm: function(docIds) {
		WebForm.remove({"_id":{"$in":docIds}});
	}

});
