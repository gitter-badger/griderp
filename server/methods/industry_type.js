Meteor.methods({

	removeIndustryType: function(docIds) {
		IndustryType.remove({"_id":{"$in":docIds}});
	}

});
