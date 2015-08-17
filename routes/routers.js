Router.configure({
  layoutTemplate: 'mainLayout',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
    template: 'Home',
    onBeforeAction: function(){
	  	this.next();
	},
	action: function () {
		this.render('Home');
	    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
	}
});

Router.route('/tasks', {
    template: 'TasksList',
    onBeforeAction: function(){
	  	this.next();
	},
	action: function () {
	    this.render('TasksList');
	    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
	}
});