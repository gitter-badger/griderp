Meteor.publish("project_list", function(limit) {
	var defaultLimit = limit || 25;
	return Project.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("project_empty", function() {
	return Project.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("project_details", function(projectId) {
	return Project.find({ _id: projectId, ownerId: this.userId }, {});
});
