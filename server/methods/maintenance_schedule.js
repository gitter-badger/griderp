Meteor.methods({

	removeMaintenanceSchedule: function(docIds) {
		MaintenanceSchedule.remove({"_id":{"$in":docIds}});
	}

});
