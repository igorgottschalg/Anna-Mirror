Tasks = new Mongo.Collection("tasks");

Tasks.attachSchema(new SimpleSchema({
	task: {
		type: String,
        label: 'Tarefa',
	},
	owner:{
		type: String,
		label: "Usuário"
	},
	isDone: {
		type: Boolean,
		label: "Pronto",
		optional: true
	},
	forecast: {
		type: String,
		label: 'Previsão',
		optional: true
	},
	createdAt: {
		type: String,
		label: 'Criado em'
	}
}));

Meteor.methods({
  createTask: function(collectionName, data) {
    global[collectionName].insert({
      data: data
    });
    console.log("criando: "+ data)
  }
});

if (Meteor.isServer) {
  Meteor.publish("tasks", function () {
    return Tasks.find();
  });
}


if (Meteor.isClient) {
 	Meteor.subscribe("tasks");
}