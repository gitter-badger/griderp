Meteor.methods({

	removeUom: function(docIds) {
		Uom.remove({"_id":{"$in":docIds}});
	}

});
