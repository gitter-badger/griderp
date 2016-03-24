Meteor.publish("bom_list", function(limit) {
	var defaultLimit = limit || 25;
	return Bom.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("bom_empty", function() {
	return Bom.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("bom_details", function(bomId) {
	return Bom.find({ _id: bomId, ownerId: this.userId }, {});
});
