TermsAndConditions.allow({
	insert: function (userId, doc) {
		return TermsAndConditions.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return TermsAndConditions.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return TermsAndConditions.userCanRemove(userId, doc);
	}
});

TermsAndConditions.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

TermsAndConditions.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

TermsAndConditions.before.remove(function(userId, doc) {
	
});

TermsAndConditions.after.insert(function(userId, doc) {
	
});

TermsAndConditions.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

TermsAndConditions.after.remove(function(userId, doc) {
	
});
