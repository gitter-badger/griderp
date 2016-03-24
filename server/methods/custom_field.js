Meteor.methods({

	removeCustomField: function(docIds) {
		CustomField.remove({"_id":{"$in":docIds}});
	}

});
