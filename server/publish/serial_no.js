Meteor.publish("serial_no_list", function(limit) {
	var defaultLimit = limit || 25;
	return SerialNo.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("serial_no_empty", function() {
	return SerialNo.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("serial_no_details", function(serialNoId) {
	return SerialNo.find({ _id: serialNoId, ownerId: this.userId }, {});
});
