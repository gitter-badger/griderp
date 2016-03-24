Meteor.methods({

	removeWarehouse: function(docIds) {
		Warehouse.remove({"_id":{"$in":docIds}});
	}

});
