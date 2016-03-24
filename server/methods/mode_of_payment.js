Meteor.methods({

	removeModeOfPayment: function(docIds) {
		ModeOfPayment.remove({"_id":{"$in":docIds}});
	}

});
