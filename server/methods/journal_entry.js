Meteor.methods({

	removeJournalEntry: function(docIds) {
		JournalEntry.remove({"_id":{"$in":docIds}});
	}

});
