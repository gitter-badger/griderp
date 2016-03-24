Meteor.methods({

	removeSerialNo: function(docIds) {
		SerialNo.remove({"_id":{"$in":docIds}});
	}

});
