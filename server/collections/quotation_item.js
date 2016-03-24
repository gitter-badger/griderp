QuotationItem.allow({
	insert: function (userId, doc) {
		return QuotationItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return QuotationItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return QuotationItem.userCanRemove(userId, doc);
	}
});

QuotationItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

QuotationItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

QuotationItem.before.remove(function(userId, doc) {
	
});

QuotationItem.after.insert(function(userId, doc) {
	
});

QuotationItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

QuotationItem.after.remove(function(userId, doc) {
	
});
