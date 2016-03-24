Quotation.allow({
	insert: function (userId, doc) {
		return Quotation.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Quotation.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Quotation.userCanRemove(userId, doc);
	}
});

Quotation.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Quotation.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Quotation.before.remove(function(userId, doc) {
	
});

Quotation.after.insert(function(userId, doc) {
	
});

Quotation.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Quotation.after.remove(function(userId, doc) {
	
});
