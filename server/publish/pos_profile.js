Meteor.publish("pos_profile_list", function(limit) {
	var defaultLimit = limit || 25;
	return PosProfile.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("pos_profile_empty", function() {
	return PosProfile.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("pos_profile_details", function(posProfileId) {
	return PosProfile.find({ _id: posProfileId, ownerId: this.userId }, {});
});
