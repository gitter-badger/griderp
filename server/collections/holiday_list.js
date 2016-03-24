HolidayList.allow({
	insert: function (userId, doc) {
		return HolidayList.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return HolidayList.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return HolidayList.userCanRemove(userId, doc);
	}
});

HolidayList.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

HolidayList.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

HolidayList.before.remove(function(userId, doc) {
	
});

HolidayList.after.insert(function(userId, doc) {
	
});

HolidayList.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

HolidayList.after.remove(function(userId, doc) {
	
});
