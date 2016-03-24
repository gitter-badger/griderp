Meteor.methods({

	removeModuleDef: function(docIds) {
		ModuleDef.remove({"_id":{"$in":docIds}});
	}

});
