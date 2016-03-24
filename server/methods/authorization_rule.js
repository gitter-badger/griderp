Meteor.methods({

	removeAuthorizationRule: function(docIds) {
		AuthorizationRule.remove({"_id":{"$in":docIds}});
	}

});
