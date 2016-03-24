Meteor.methods({

	removeWorkflowState: function(docIds) {
		WorkflowState.remove({"_id":{"$in":docIds}});
	}

});
