Meteor.publish("module_def_list", function(limit) {
	var defaultLimit = limit || 25;
	return ModuleDef.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("module_def_empty", function() {
	return ModuleDef.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("module_def_details", function(moduleDefId) {
	return ModuleDef.find({ _id: moduleDefId, ownerId: this.userId }, {});
});
