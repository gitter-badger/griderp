Meteor.publish("fiscal_year_list", function(limit) {
	var defaultLimit = limit || 25;
	return FiscalYear.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("fiscal_year_empty", function() {
	return FiscalYear.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("fiscal_year_details", function(fiscalYearId) {
	return FiscalYear.find({ _id: fiscalYearId, ownerId: this.userId }, {});
});
