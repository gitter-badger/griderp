var pageSession = new ReactiveDict();

Template.PosStart.rendered = function() {
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

Template.PosStart.events({
	
});

Template.PosStart.helpers({
	
});


