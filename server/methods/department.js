Meteor.methods({

	removeDepartment: function(docIds) {
		Department.remove({"_id":{"$in":docIds}});
	}

});
