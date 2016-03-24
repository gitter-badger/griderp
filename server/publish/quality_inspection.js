Meteor.publish("quality_inspection_list", function(limit) {
	var defaultLimit = limit || 25;
	return QualityInspection.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("quality_inspection_empty", function() {
	return QualityInspection.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("quality_inspection_details", function(qualityInspectionId) {
	return QualityInspection.find({ _id: qualityInspectionId, ownerId: this.userId }, {});
});
