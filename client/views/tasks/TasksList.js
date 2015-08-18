Template.TasksList.rendered = function () {
	Session.set("showCompleted", false);
};
Template.mainLayout.events({
    'click #salvar': function() {
        console.log("Click");
        var taskText = $('#new-task').val();
        console.log("Value: " + taskText);
        Tasks.insert({
            task: taskText,
            owner: Meteor.userId(),
            forecast: new Date(),
            createdAt: new Date(),
            isDone: false
        });
    },
    'click #showAll': function(){
    	Session.set("showCompleted", !Session.get("showCompleted"));
    }
});
Template.TasksList.events({
    'click .toggle-task': function(e, tmpl) {
        Tasks.update({
            _id: this._id
        }, {
            $set: {
                isDone: !this.isDone
            }
        });
    }
});

if (Meteor.isClient) {
    Template.TasksList.taskList = function() {
        return Tasks.find({
            owner: Meteor.userId()
        });
    };
    Template.TasksList.complete = function() {
        return this.isDone ? "complete" : "";
    }
    Template.TasksList.active = function() {
        return this.isDone ? "active" : "";
    }    
    Template.TasksList.date = function(){
    	date = new Date(this.forecast);
    	return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getYear();
    }
    Template.TasksList.showStatus = function(){
    	return Session.get('showCompleted') ? "active" : "";
    }
    Template.TasksList.outlined = function(){
    	return Session.get('showCompleted') ? "" : "btn-outlined";
    }
    Template.TasksList.outlinedBadge = function(){
    	return Session.get('showCompleted') ? "badge badge-primary badge-positive" : "badge badge-primary badge-inverted";
    }
    Template.TasksList.completCount = function(){
    	return Tasks.find({
            owner: Meteor.userId(),
            isDone: true
        }).count();
    }
    Meteor.setInterval(function() {
    	if(!Session.get('showCompleted')){
    		$(".task-list").find(".toggle.active").each(function(index, element) {
	        	$(element).parent().animate({ width: "hide"}, '0.3');
	        });
    	}else{
    		$(".task-list").find(".toggle.active").each(function(index, element) {
	        	$(element).parent().animate({ width: "show" }, '0.3');
	        });
    	}
    }, 3000);
}
