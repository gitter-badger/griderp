Opportunity.allow({
	insert: function (userId, doc) {
		return Opportunity.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Opportunity.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Opportunity.userCanRemove(userId, doc);
	}
});

Opportunity.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Opportunity.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Opportunity.before.remove(function(userId, doc) {
	
});

Opportunity.after.insert(function(userId, doc) {
	
});

Opportunity.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Opportunity.after.remove(function(userId, doc) {
	
});
