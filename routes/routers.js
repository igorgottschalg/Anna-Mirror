Router.configure({
  layoutTemplate: 'mainLayout',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
	name: 'Splash',
    template: 'Splash',
	action: function () {
		this.render('Splash');
	},
    onAfterAction: function(){
    	if(Meteor.userId()){
    		Router.go("Home");
    	}
    	this.layout("splashLayout");
	  	this.next();
	}
});

Router.route('/home', {
	name: 'Home',
    template: 'Home',
    onBeforeAction: function(){
    	if(!Meteor.userId()){
    		Router.go("Splash");
    	}
	  	this.next();
	},
	action: function () {
		this.render('Home');
	}
});

Router.route('/tasks', {
	name: 'TaskList',
    template: 'TasksList',
    onBeforeAction: function(){
    	if(!Meteor.userId()){
    		Router.go("/");
    	}
	  	this.next();
	},
	action: function () {
	    this.render('TasksList');
	}
});