Meteor.publish("campaign_list", function(limit) {
	var defaultLimit = limit || 25;
	return Campaign.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("campaign_empty", function() {
	return Campaign.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("campaign_details", function(campaignId) {
	return Campaign.find({ _id: campaignId, ownerId: this.userId }, {});
});
