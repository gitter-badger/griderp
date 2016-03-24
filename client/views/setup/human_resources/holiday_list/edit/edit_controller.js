this.HolidayListEditController = RouteController.extend({
	template: "HolidayListEdit",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("holiday_list_details", this.params.holidayListId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
			holiday_list_details: HolidayList.findOne({_id: this.params.holidayListId}, {}),
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
