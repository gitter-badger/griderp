Meteor.methods({

	removeBrand: function(docIds) {
		Brand.remove({"_id":{"$in":docIds}});
	}

});
