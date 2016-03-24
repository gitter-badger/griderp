Meteor.methods({

	removeCompany: function(docIds) {
		Company.remove({"_id":{"$in":docIds}});
	}

});
