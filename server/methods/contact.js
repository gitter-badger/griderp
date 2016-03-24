Meteor.methods({

	removeContact: function(docIds) {
		Contact.remove({"_id":{"$in":docIds}});
	}

});
