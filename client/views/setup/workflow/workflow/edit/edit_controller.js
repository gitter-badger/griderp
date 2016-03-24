this.WorkflowEditController = RouteController.extend({
	template: "WorkflowEdit",
	

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
			Meteor.subscribe("workflow_details", this.params.workflowId)
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
			workflow_details: Workflow.findOne({_id: this.params.workflowId}, {}),
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});
