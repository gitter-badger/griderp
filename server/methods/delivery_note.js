Meteor.methods({

	removeDeliveryNote: function(docIds) {
		DeliveryNote.remove({"_id":{"$in":docIds}});
	}

});
