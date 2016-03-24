Meteor.methods({

	removeCommunication: function(docIds) {
		Communication.remove({"_id":{"$in":docIds}});
	}

});
