var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://tushar:tushar@ds125565.mlab.com:25565/to-do-nodejs');


var todoSchema = new mongoose.Schema({
	item : String
});

var Todo = mongoose.model('to-do-nodejs',todoSchema);


// var data = [{item: 'get milk'} , {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

	app.get('/todo',function(req,res){

		Todo.find({} , function(err,data){
			if(err) throw err;
		res.render('todo' , {todos: data});
		});
		
	});

	app.post('/todo',urlencodedParser, function(req,res){
		
		var newTodo = Todo(req.body).save(function(err,data){
			if(err) throw err;
			res.json(data);
		});
		
	});
	app.delete('/todo',function(req,res){
		
		Todo.find({item: req.params.item.replace (/\-/g," ")}).remove(function(err,data){
			if(err) throw  err;
			res.json(data);
		});
	});
};