Meteor.methods({

	removeAppraisalTemplate: function(docIds) {
		AppraisalTemplate.remove({"_id":{"$in":docIds}});
	}

});
