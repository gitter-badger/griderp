NewsletterListSubscriber.allow({
	insert: function (userId, doc) {
		return NewsletterListSubscriber.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return NewsletterListSubscriber.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return NewsletterListSubscriber.userCanRemove(userId, doc);
	}
});

NewsletterListSubscriber.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

NewsletterListSubscriber.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

NewsletterListSubscriber.before.remove(function(userId, doc) {
	
});

NewsletterListSubscriber.after.insert(function(userId, doc) {
	
});

NewsletterListSubscriber.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

NewsletterListSubscriber.after.remove(function(userId, doc) {
	
});
