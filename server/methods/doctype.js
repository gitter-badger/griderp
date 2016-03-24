Meteor.methods({

	removeDoctype: function(docIds) {
		Doctype.remove({"_id":{"$in":docIds}});
	}

});
