Meteor.publish("letter_head_list", function(limit) {
	var defaultLimit = limit || 25;
	return LetterHead.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("letter_head_empty", function() {
	return LetterHead.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("letter_head_details", function(letterHeadId) {
	return LetterHead.find({ _id: letterHeadId, ownerId: this.userId }, {});
});
