Meteor.publish("web_form_list", function(limit) {
	var defaultLimit = limit || 25;
	return WebForm.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("web_form_empty", function() {
	return WebForm.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("web_form_details", function(webFormId) {
	return WebForm.find({ _id: webFormId, ownerId: this.userId }, {});
});
