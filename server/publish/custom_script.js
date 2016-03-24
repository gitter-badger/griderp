Meteor.publish("custom_script_list", function(limit) {
	var defaultLimit = limit || 25;
	return CustomScript.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("custom_script_empty", function() {
	return CustomScript.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("custom_script_details", function(customScriptId) {
	return CustomScript.find({ _id: customScriptId, ownerId: this.userId }, {});
});
