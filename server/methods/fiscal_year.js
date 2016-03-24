Meteor.methods({

	removeFiscalYear: function(docIds) {
		FiscalYear.remove({"_id":{"$in":docIds}});
	}

});
