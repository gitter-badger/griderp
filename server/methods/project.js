Meteor.methods({

	removeProject: function(docIds) {
		Project.remove({"_id":{"$in":docIds}});
	}

});
