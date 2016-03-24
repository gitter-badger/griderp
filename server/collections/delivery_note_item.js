DeliveryNoteItem.allow({
	insert: function (userId, doc) {
		return DeliveryNoteItem.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return DeliveryNoteItem.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return DeliveryNoteItem.userCanRemove(userId, doc);
	}
});

DeliveryNoteItem.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

DeliveryNoteItem.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

DeliveryNoteItem.before.remove(function(userId, doc) {
	
});

DeliveryNoteItem.after.insert(function(userId, doc) {
	
});

DeliveryNoteItem.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

DeliveryNoteItem.after.remove(function(userId, doc) {
	
});
