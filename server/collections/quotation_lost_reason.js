QuotationLostReason.allow({
	insert: function (userId, doc) {
		return QuotationLostReason.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return QuotationLostReason.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return QuotationLostReason.userCanRemove(userId, doc);
	}
});

QuotationLostReason.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

QuotationLostReason.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

QuotationLostReason.before.remove(function(userId, doc) {
	
});

QuotationLostReason.after.insert(function(userId, doc) {
	
});

QuotationLostReason.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

QuotationLostReason.after.remove(function(userId, doc) {
	
});
