CurrencyExchange.allow({
	insert: function (userId, doc) {
		return CurrencyExchange.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return CurrencyExchange.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return CurrencyExchange.userCanRemove(userId, doc);
	}
});

CurrencyExchange.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

CurrencyExchange.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

CurrencyExchange.before.remove(function(userId, doc) {
	
});

CurrencyExchange.after.insert(function(userId, doc) {
	
});

CurrencyExchange.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CurrencyExchange.after.remove(function(userId, doc) {
	
});
