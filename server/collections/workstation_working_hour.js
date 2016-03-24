WorkstationWorkingHour.allow({
	insert: function (userId, doc) {
		return WorkstationWorkingHour.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return WorkstationWorkingHour.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return WorkstationWorkingHour.userCanRemove(userId, doc);
	}
});

WorkstationWorkingHour.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

WorkstationWorkingHour.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

WorkstationWorkingHour.before.remove(function(userId, doc) {
	
});

WorkstationWorkingHour.after.insert(function(userId, doc) {
	
});

WorkstationWorkingHour.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

WorkstationWorkingHour.after.remove(function(userId, doc) {
	
});
