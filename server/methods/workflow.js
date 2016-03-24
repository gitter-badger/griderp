Meteor.methods({

	removeWorkflow: function(docIds) {
		Workflow.remove({"_id":{"$in":docIds}});
	}

});
