Meteor.methods({

	removeMaintenanceVisit: function(docIds) {
		MaintenanceVisit.remove({"_id":{"$in":docIds}});
	}

});
