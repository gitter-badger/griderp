Meteor.publish("print_heading_list", function(limit) {
	var defaultLimit = limit || 25;
	return PrintHeading.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("print_heading_empty", function() {
	return PrintHeading.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("print_heading_details", function(printHeadingId) {
	return PrintHeading.find({ _id: printHeadingId, ownerId: this.userId }, {});
});
