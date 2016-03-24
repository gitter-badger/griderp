SupplierQuotationItem.allow({
	insert: function (userId, doc) {
		return SupplierQuotationItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return SupplierQuotationItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return SupplierQuotationItem.userCanRemove(userId, doc);
	}
});

SupplierQuotationItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

SupplierQuotationItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

SupplierQuotationItem.before.remove(function(userId, doc) {
	
});

SupplierQuotationItem.after.insert(function(userId, doc) {
	
});

SupplierQuotationItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

SupplierQuotationItem.after.remove(function(userId, doc) {
	
});
