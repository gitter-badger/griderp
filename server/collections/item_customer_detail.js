ItemCustomerDetail.allow({
	insert: function (userId, doc) {
		return ItemCustomerDetail.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return ItemCustomerDetail.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return ItemCustomerDetail.userCanRemove(userId, doc);
	}
});

ItemCustomerDetail.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

ItemCustomerDetail.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

ItemCustomerDetail.before.remove(function(userId, doc) {
	
});

ItemCustomerDetail.after.insert(function(userId, doc) {
	
});

ItemCustomerDetail.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ItemCustomerDetail.after.remove(function(userId, doc) {
	
});
