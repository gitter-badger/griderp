Meteor.publish("doctype_list", function(limit) {
	var defaultLimit = limit || 25;
	return Doctype.find({ ownerId: this.userId }, {limit: defaultLimit, sort: { name: 1 } });
});

Meteor.publish("doctype_empty", function() {
	return Doctype.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("doctype_details", function(doctypeId) {
	return Doctype.find({ _id: doctypeId, ownerId: this.userId }, { sort: { name: 1 }});
});
