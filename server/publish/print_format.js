Meteor.publish("print_format_list", function(limit) {
	var defaultLimit = limit || 25;
	return PrintFormat.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("print_format_empty", function() {
	return PrintFormat.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("print_format_details", function(printFormatId) {
	return PrintFormat.find({ _id: printFormatId, ownerId: this.userId }, {});
});
