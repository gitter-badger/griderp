Meteor.methods({

	removeAddressTemplate: function(docIds) {
		AddressTemplate.remove({"_id":{"$in":docIds}});
	}

});
