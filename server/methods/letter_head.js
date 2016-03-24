Meteor.methods({

	removeLetterHead: function(docIds) {
		LetterHead.remove({"_id":{"$in":docIds}});
	}

});
