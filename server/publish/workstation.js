Meteor.publish("workstation_list", function(limit) {
	var defaultLimit = limit || 25;
	return Workstation.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("workstation_empty", function() {
	return Workstation.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("workstation_details", function(workstationId) {
	return Workstation.find({ _id: workstationId, ownerId: this.userId }, {});
});
