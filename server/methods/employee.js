Meteor.methods({

	removeEmployee: function(docIds) {
		Employee.remove({"_id":{"$in":docIds}});
	}

});
