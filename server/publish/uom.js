Meteor.publish("uom_list", function(limit) {
	var defaultLimit = limit || 25;
	return Uom.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("uom_empty", function() {
	return Uom.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("uom_details", function(uomId) {
	return Uom.find({ _id: uomId, ownerId: this.userId }, {});
});
