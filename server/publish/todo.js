Meteor.publish("todo_list", function(limit) {
	var defaultLimit = limit || 25;
	return Todo.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("todo_empty", function() {
	return Todo.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("todo_details", function(todoId) {
	return Todo.find({ _id: todoId, ownerId: this.userId }, {});
});
