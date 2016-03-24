Meteor.publish("installation_note_list", function(limit) {
	var defaultLimit = limit || 25;
	return InstallationNote.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("installation_note_empty", function() {
	return InstallationNote.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("installation_note_details", function(installationNoteId) {
	return InstallationNote.find({ _id: installationNoteId, ownerId: this.userId }, {});
});
