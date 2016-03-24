Meteor.methods({

	removeStandardReply: function(docIds) {
		StandardReply.remove({"_id":{"$in":docIds}});
	}

});
