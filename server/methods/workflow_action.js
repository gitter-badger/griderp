Meteor.methods({

	removeWorkflowAction: function(docIds) {
		WorkflowAction.remove({"_id":{"$in":docIds}});
	}

});
