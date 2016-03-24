Meteor.methods({

	removeTodo: function(docIds) {
		Todo.remove({"_id":{"$in":docIds}});
	}

});
