Meteor.methods({

	removeHolidayList: function(docIds) {
		HolidayList.remove({"_id":{"$in":docIds}});
	}

});
