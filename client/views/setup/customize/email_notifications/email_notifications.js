Template.SetupCustomizeEmailNotifications.rendered = function() {
	
};

Template.SetupCustomizeEmailNotifications.events({
	
});

Template.SetupCustomizeEmailNotifications.helpers({
	
});

Template.EmailNotificationsForm.rendered = function() {
	$('.summernote').summernote({
		height: 300,
		focus: false,
		codemirror: {
			htmlMode: true,
			lineNumbers: true,
			mode: 'text/html'
		}
	});

};

Template.EmailNotificationsForm.events({
	
});

Template.EmailNotificationsForm.helpers({
	
});
