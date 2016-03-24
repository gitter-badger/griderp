Meteor.publish("maintenance_visit_list", function(limit) {
	var defaultLimit = limit || 25;
	return MaintenanceVisit.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("maintenance_visit_empty", function() {
	return MaintenanceVisit.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("maintenance_visit_details", function(maintenanceVisitId) {
	return MaintenanceVisit.find({ _id: maintenanceVisitId, ownerId: this.userId }, {});
});
