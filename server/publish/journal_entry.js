Meteor.publish("journal_entry_list", function(limit) {
	var defaultLimit = limit || 25;
	return JournalEntry.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("journal_entry_empty", function() {
	return JournalEntry.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("journal_entry_details", function(journalEntryId) {
	return JournalEntry.find({ _id: journalEntryId, ownerId: this.userId }, {});
});
