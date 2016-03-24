Meteor.publish("maintenance_schedule_list", function(limit) {
	var defaultLimit = limit || 25;
	return MaintenanceSchedule.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("maintenance_schedule_empty", function() {
	return MaintenanceSchedule.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("maintenance_schedule_details", function(maintenaceScheduleId) {
	return MaintenanceSchedule.find({ _id: maintenaceScheduleId, ownerId: this.userId }, {});
});
