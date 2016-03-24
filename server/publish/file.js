Meteor.publish("file_list", function(limit) {
	var defaultLimit = limit || 25;
	return File.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("file_empty", function() {
	return File.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("file_details", function(fileId) {
	return File.find({ _id: fileId, ownerId: this.userId }, {});
});
