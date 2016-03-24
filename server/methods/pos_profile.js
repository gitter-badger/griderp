Meteor.methods({

	removePosProfile: function(docIds) {
		PosProfile.remove({"_id":{"$in":docIds}});
	}

});
