Meteor.publish("monthly_distribution_list", function(limit) {
	var defaultLimit = limit || 25;
	return MonthlyDistribution.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("monthly_distribution_empty", function() {
	return MonthlyDistribution.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("monthly_distribution_details", function(monthlyDistributionId) {
	return MonthlyDistribution.find({ _id: monthlyDistributionId, ownerId: this.userId }, {});
});
