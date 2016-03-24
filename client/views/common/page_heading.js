Template.PageHeading.helpers({

	"log": function() {
		console.log(this);
	} 

});

Template.registerHelper("equals", function (a, b) {
      return a === b;
});


