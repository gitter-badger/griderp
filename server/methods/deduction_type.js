Meteor.methods({

	removeDeductionType: function(docIds) {
		DeductionType.remove({"_id":{"$in":docIds}});
	}

});
