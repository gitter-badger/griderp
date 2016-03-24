Meteor.publish("note_list", function(limit) {
	var defaultLimit = limit || 25;
	return Note.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("note_empty", function() {
	return Note.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("note_details", function(noteId) {
	return Note.find({ _id: noteId, ownerId: this.userId }, {});
});
