OpportunityItem.allow({
	insert: function (userId, doc) {
		return OpportunityItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return OpportunityItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return OpportunityItem.userCanRemove(userId, doc);
	}
});

OpportunityItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

OpportunityItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

OpportunityItem.before.remove(function(userId, doc) {
	
});

OpportunityItem.after.insert(function(userId, doc) {
	
});

OpportunityItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

OpportunityItem.after.remove(function(userId, doc) {
	
});
