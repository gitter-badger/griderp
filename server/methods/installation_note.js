Meteor.methods({

	removeInstallationNote: function(docIds) {
		InstallationNote.remove({"_id":{"$in":docIds}});
	}

});
