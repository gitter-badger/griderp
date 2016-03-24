Meteor.methods({

	removeEmploymentType: function(docIds) {
		EmploymentType.remove({"_id":{"$in":docIds}});
	}

});
