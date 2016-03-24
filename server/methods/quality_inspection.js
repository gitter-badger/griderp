Meteor.methods({

	removeQualityInspection: function(docIds) {
		QualityInspection.remove({"_id":{"$in":docIds}});
	}

});
