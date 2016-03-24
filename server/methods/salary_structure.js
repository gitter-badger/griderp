Meteor.methods({

	removeSalaryStructure: function(docIds) {
		SalaryStructure.remove({"_id":{"$in":docIds}});
	}

});
