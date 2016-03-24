CFormInvoiceDetail.allow({
	insert: function (userId, doc) {
		return CFormInvoiceDetail.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return CFormInvoiceDetail.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return CFormInvoiceDetail.userCanRemove(userId, doc);
	}
});

CFormInvoiceDetail.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

CFormInvoiceDetail.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

CFormInvoiceDetail.before.remove(function(userId, doc) {
	
});

CFormInvoiceDetail.after.insert(function(userId, doc) {
	
});

CFormInvoiceDetail.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CFormInvoiceDetail.after.remove(function(userId, doc) {
	
});
