Meteor.methods({

	removeProductionOrder: function(docIds) {
		ProductionOrder.remove({"_id":{"$in":docIds}});
	}

});
