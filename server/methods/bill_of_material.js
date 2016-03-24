Meteor.methods({

	removeBom: function(docIds) {
		Bom.remove({"_id":{"$in":docIds}});
	}

});
