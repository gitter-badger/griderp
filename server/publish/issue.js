Meteor.publish("issue_list", function(limit) {
	var defaultLimit = limit || 25;
	return Issue.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("issue_empty", function() {
	return Issue.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("issue_details", function(issueId) {
	return Issue.find({ _id: issueId, ownerId: this.userId }, {});
});
