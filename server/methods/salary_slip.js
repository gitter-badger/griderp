Meteor.methods({

	removeSalarySlip: function(docIds) {
		SalarySlip.remove({"_id":{"$in":docIds}});
	}

});
